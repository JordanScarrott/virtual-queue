# Headless Virtual Queueing Application

This repository contains the core business logic for a modern, headless virtual queueing application. The system is designed to provide a simple and intuitive way for users to join and manage their place in a queue via their mobile devices, while giving businesses powerful tools to manage customer flow.

The project is built with **Deno** and **TypeScript**. It strictly follows a **Headless, Ports and Adapters (Hexagonal)** architecture to ensure a clean separation between the core application logic and external technologies like UIs and backend services.

## Development

This section provides instructions for setting up the development environment and running the project.

### 1. Install Deno

Deno is required to run this project. You can install it using one of the following commands:

**macOS / Linux (Shell):**
```shell
curl -fsSL https://deno.land/install.sh | sh
```

**Windows (PowerShell):**
```powershell
irm https://deno.land/install.ps1 | iex
```

After installation, you may need to add the Deno executable to your shell's PATH. The installer provides instructions for this.

### 2. Project Tasks

This project uses Deno's built-in task runner. The following tasks are available in the `deno.jsonc` file:

*   **`deno task start`**: Runs the application.
*   **`deno task dev`**: Runs the application in watch mode, automatically restarting on file changes.
*   **`deno task test`**: Runs the test suite.
*   **`deno task lint`**: Lints the codebase to check for style issues.

You can run any of these tasks from the root of the project. For example, to start the application, run:

```shell
deno task start
```
