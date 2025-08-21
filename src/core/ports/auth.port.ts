import { User } from "../domain/user.ts";

/**
 * Defines the contract for handling user authentication and session management.
 * This is a "driven port" that the core application uses to interact with external
 * authentication services.
 */
export interface AuthPort {
  /**
   * Retrieves the currently authenticated user.
   * @returns A Promise that resolves to the User object if authenticated, or null otherwise.
   */
  getAuthenticatedUser(): Promise<User | null>;
}
