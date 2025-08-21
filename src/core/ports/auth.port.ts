import { User } from "../domain/user.ts";

/**
 * Port for authentication and session management.
 * This interface defines the contract for interacting with an authentication service.
 */
export interface AuthPort {
  /**
   * Retrieves the currently authenticated user.
   * @returns A Promise that resolves to the User object if authenticated, or null otherwise.
   */
  getAuthenticatedUser(): Promise<User | null>;
}
