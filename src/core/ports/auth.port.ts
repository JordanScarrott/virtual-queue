import { User } from "../domain/user.ts";

/**
 * Defines the contract for handling user authentication and session management.
 * This is a "driven port" that the core application uses to interact with external
 * authentication services.
 */
export interface AuthPort {
  /**
   * Initiates the sign-in or registration flow.
   * @returns A Promise that resolves to the authenticated User object, or null if the process fails.
   */
  signOrLogIn(): Promise<User | null>;

  /**
   * Signs the current user out.
   * @returns A Promise that resolves when the sign-out process is complete.
   */
  signOut(): Promise<void>;
}
