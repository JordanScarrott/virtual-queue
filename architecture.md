# Architecture: Ports and Adapters (Hexagonal)

This document outlines the Ports and Adapters (or Hexagonal) architecture for this project. This architectural pattern isolates the core application logic from external concerns, such as frameworks, UI, and infrastructure.

## 1. Core / Domain

The **Core** of the application contains the pure, framework-agnostic business logic. It is written entirely in TypeScript and has no dependencies on external systems or libraries. The core is responsible for:

-   Defining the business entities and rules.
-   Defining the **Ports**, which are interfaces that establish contracts for communication with the outside world.

The core knows nothing about how it is used or what technologies are used to implement the ports.

## 2. Ports

Ports are the interfaces that define how the core application interacts with external systems. They are the boundaries of our application. There are two types of ports: Driven Ports and Driving Ports.

### Driven Ports (Core → External Services)

These are interfaces that the core application *uses* to get information from the outside world (e.g., databases, third-party APIs, backend services). The core defines the interface, and an external adapter implements it.

Our initial driven ports are:

-   **`AuthPort`**: Defines the contract for handling user authentication and session management.
    ```typescript
    interface AuthPort {
      getAuthenticatedUser(): Promise<User | null>;
      // ... other auth-related methods
    }
    ```
-   **`QueueApiPort`**: Defines the contract for interacting with the backend queue management system.
    ```typescript
    interface QueueApiPort {
      fetchQueueDetails(queueId: string): Promise<Queue>;
      // ... other queue data-related methods
    }
    ```

### Driving Port (External Clients → Core)

This is the interface that external clients (like a CLI or a web app) use to *drive* the core application's logic. It exposes the application's features to the outside world.

-   **`AppPort`**: Exposes the primary functionalities of the virtual queueing application.

## 3. Design Philosophy: Database-Oriented Domain Models

A key principle in this project is to **minimize abstractions** over the core domain models. We lean heavily into a database-oriented design, where the domain objects (`Queue`, `User`, `Business`) are intended to be lean data containers that closely mirror the expected database schema.

This has two main implications:

1.  **No Service Layer in the Core**: The application's business logic is not encapsulated within a "service" class inside the core. Instead, logic that orchestrates multiple domain objects is placed in the **Driving Adapters**. The core remains a collection of data models and the ports (interfaces) that define how to interact with them.
2.  **Rich Domain Objects are Avoided**: We intentionally avoid creating complex domain objects with their own methods and business rules. Domain objects are kept simple and are enriched with any necessary computed data (like `userCount` or `estimatedWaitTime`) by the adapters before being sent to the UI. This prevents a mismatch between the state managed by the application and the state persisted in the database.

## 4. Adapters

Adapters are the concrete implementations of the ports. They contain the technology-specific code that bridges the gap between the core and the outside world.

### Driven Adapters

These are implementations of the **Driven Ports**. They adapt external services to the needs of our application core. For the initial development phase, we will use mock adapters to simulate backend services.

-   **`MockAuthAdapter`**: Implements the `AuthPort`. It will return hardcoded user data, allowing for frontend development without a real authentication service.
-   **`MockQueueApiAdapter`**: Implements the `QueueApiPort`. It will return hardcoded queue data, enabling the development of queue management features without a live backend.

### Driving Adapters

These adapters initiate actions on the core application. They are typically part of a separate frontend application (e.g., a Next.js or Astro repository) that consumes this headless core. These adapters will implement the **`AppPort`** to call the core logic in response to user interactions or other events.
