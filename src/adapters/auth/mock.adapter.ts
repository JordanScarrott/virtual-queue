import { AuthPort } from "../../core/ports/auth.port.ts";
import { User } from "../../core/domain/user.ts";

/**
 * A mock implementation of the AuthPort.
 * This adapter is used for development and testing purposes.
 * It simulates user authentication without needing a real backend.
 */
export class MockAuthAdapter implements AuthPort {
  /**
   * Simulates signing in a user.
   * Returns a hardcoded user object.
   */
  public async signOrLogIn(): Promise<User | null> {
    const user = new User(
      "user-123",
      "Jules",
      "Verne",
      "jules.verne@example.com",
    );
    return await Promise.resolve(user);
  }

  /**
   * Simulates signing out a user.
   * Does nothing but returns a resolved promise.
   */
  public async signOut(): Promise<void> {
    return await Promise.resolve();
  }
}
