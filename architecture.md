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

This is the interface that external clients (like a Next.js or Astro application) use to *drive* the core application's logic. It exposes the application's features to the outside world.

Our initial driving port is:

-   **`QueueServicePort`**: Exposes the primary functionalities of the virtual queueing application.
    ```typescript
    interface QueueServicePort {
      joinQueue(userId: string, queueId: string): Promise<QueueStatus>;
      leaveQueue(userId: string, queueId: string): Promise<void>;
      getQueueStatus(userId: string, queueId: string): Promise<QueueStatus>;
    }
    ```

## 3. Adapters

Adapters are the concrete implementations of the ports. They contain the technology-specific code that bridges the gap between the core and the outside world.

### Driven Adapters

These are implementations of the **Driven Ports**. They adapt external services to the needs of our application core. For the initial development phase, we will use mock adapters to simulate backend services.

-   **`MockAuthAdapter`**: Implements the `AuthPort`. It will return hardcoded user data, allowing for frontend development without a real authentication service.
-   **`MockQueueApiAdapter`**: Implements the `QueueApiPort`. It will return hardcoded queue data, enabling the development of queue management features without a live backend.

### Driving Adapters

These adapters initiate actions on the core application. They are typically part of a separate frontend application (e.g., a Next.js or Astro repository) that consumes this headless core. These adapters will implement the **`QueueServicePort`** to call the core logic in response to user interactions or other events.
