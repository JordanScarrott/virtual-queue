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

-   **`UiPort`**: Exposes the primary functionalities of the virtual queueing application. This port is implemented by the central `QueueApp` class, which contains the core business logic.

## 3. Design Philosophy: Database-Oriented (Future Goal)

A key principle in this project is to **minimize abstractions** over the core domain models. The long-term vision is a database-oriented design, where domain objects (`Queue`, `User`, `Business`) are lean data containers that closely mirror a database schema.

However, the current implementation does **not** use a database. It relies on **in-memory mock data** for development and testing purposes. The design principles below should be interpreted as the target state for the architecture as it matures.

1.  **No Service Layer in the Core**: The application's business logic is not encapsulated within a "service" class inside the core. Instead, logic that orchestrates multiple domain objects is placed in the **Driving Adapters**. The core remains a collection of data models and the ports (interfaces) that define how to interact with them.
2.  **Rich Domain Objects are Avoided**: We intentionally avoid creating complex domain objects with their own methods and business rules. Domain objects are kept simple and are enriched with any necessary computed data (like `userCount` or `estimatedWaitTime`) by the adapters before being sent to the UI. This prevents a mismatch between the state managed by the application and the state persisted in the database.

## 4. Adapters

Adapters are the concrete implementations of the ports. They contain the technology-specific code that bridges the gap between the core and the outside world.

### Driven Adapters

These are implementations of the **Driven Ports**. They adapt external services to the needs of our application core. In the current implementation, the application uses mock adapters to simulate backend services without requiring a live database or authentication server.

-   **`MockAuthAdapter`**: Implements the `AuthPort` and uses a `MockAuthService` to return hardcoded user data.
-   **`MockQueueApiAdapter`**: Implements the `QueuePort` (defined in `queueApiPort.ts`) and uses a `MockQueueService` to return hardcoded queue data.

### Driving Adapters

These adapters bridge the gap between a specific UI technology (like Vue or React) and the core application. They are responsible for two primary tasks:
1.  **Calling the Core**: They are given an instance of `QueueApp` and call its methods (e.g., `joinQueue`) in response to user interactions in the UI.
2.  **Listening to the Core**: They listen for events emitted by `QueueApp` (e.g., `queue-updated`) to know when to update the UI's state.

This creates a clean, one-way data flow: the UI calls a method on the core, the core processes the request and updates its state, and then the core emits an event that the UI uses to update itself.

## 5. Communication Pattern: Event-Driven

To keep the core application completely decoupled from any specific UI framework, we use an event-driven communication pattern.

-   **Core as Event Emitter**: The `QueueApp` class extends Deno's standard `EventEmitter`. It is the source of truth for the application's state.
-   **State Changes Emit Events**: When a method that mutates state (like `joinQueue` or `leaveQueue`) is successfully executed, the `QueueApp` emits a public event, such as `queue-updated`. The payload of this event contains the new, updated state.
-   **Adapters as Event Listeners**: The driving adapters (e.g., `VueUIAdapter`) are responsible for listening to these events. When an adapter receives an event, it translates that event into an action specific to its UI framework, such as updating a Pinia store in Vue or calling a `setState` hook in React.

This pattern ensures that the core application remains "headless." It does not know or care about Pinia, React state, or any other UI-specific implementation detail. It simply announces that its state has changed, and it is up to the adapters to decide how to react to that information.
