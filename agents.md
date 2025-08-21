# Agent Protocol & Work Log

---

## Agent Protocol (Mandatory)

All agents contributing to this repository **must** follow these steps before starting work:

1.  **Review `tasks.md`**: Identify an open task from the list of actionable items.
2.  **Review `plan.md`**: Understand how your assigned task fits into the broader, long-term project vision.
3.  **Review `architecture.md`**: Ensure your proposed changes strictly adhere to the defined Ports and Adapters architecture. Do not introduce dependencies that violate the separation of concerns.
4.  **Review this file (`agents.md`)**: Check the "Work Log" below to understand the context of recent changes and avoid duplicating effort.
5.  **Update Logs**: After successfully completing and merging your work, add a new entry to the "Work Log" detailing your changes.

---

## Work Log

| Date         | Agent      | Summary of Changes                                           |
|--------------|------------|--------------------------------------------------------------|
| 2024-08-21   | Jules      | Implemented the `MockQueueApiAdapter` to provide a mock implementation of the `QueueApiPort`, including mock data for testing. |
| 2024-08-21   | Jules 2.0  | Initialized the project with core documentation files: `plan.md`, `architecture.md`, `agents.md`, `tasks.md`, and `README.md`. |
| 2024-08-21   | Jules      | Set up the initial Deno project structure, including directories for the hexagonal architecture and a `deno.jsonc` configuration file with strict TypeScript enabled. |
| 2024-08-21   | Jules      | Added comprehensive development instructions to `README.md`. Created a placeholder `main.ts` entry point and added `start`/`dev` run tasks to `deno.jsonc`. |
| 2024-08-21   | Jules      | Defined the core domain models (`User`, `Queue`, `Business`) in `src/core/domain`.                                                                                             |
| 2024-08-21   | Jules      | Refined the core domain models to be classes and updated their properties based on user feedback.                                                                              |
| 2024-08-21   | Jules      | Implemented `MockAuthAdapter` to provide a test implementation of the `AuthPort`.                                                                                                |
