import { AuthPort } from "../core/ports/auth.port.ts";
import { User } from "../core/domain/user.ts";

/**
 * A mock implementation of the AuthPort for development and testing.
 * This adapter returns hardcoded user data without interacting with a real
 * authentication service.
 */
export class MockAuthAdapter implements AuthPort {
  /**
   * Simulates a user sign-in process.
   *
   * @returns A Promise that resolves to a hardcoded User object.
   */
  public async signOrLogIn(): Promise<User | null> {
    // In a real scenario, this would involve a call to an auth service.
    // Here, we just return a mock user.
    const mockUser = new User(
      "user-id-001", // A static ID for the mock user
      [], // The user is not part of any queues initially
      "Mock User", // A display name
    );
    return Promise.resolve(mockUser);
  }

  /**
   * Simulates a user sign-out process.
   *
   * @returns A Promise that resolves immediately.
   */
  public async signOut(): Promise<void> {
    // In a real scenario, this would clear the user's session.
    // Here, we do nothing and just resolve the promise.
    console.log("User signed out (mock).");
    return Promise.resolve();
  }
}
