/**
 * Represents a virtual queue or line for a specific service at a business.
 *
 * A queue is a central entity where users are organized in a first-in, first-out
 * manner. It manages the order of users and provides status information.
 */
export class Queue {
  /**
   * @param id - A unique identifier for the queue (e.g., a UUID).
   * @param name - A descriptive name for the queue (e.g., "Main Checkout", "Service Desk").
   * @param userIds - An ordered array of user IDs currently in the queue.
   *   The user at index 0 is at the front of the line.
   * @param businessId - The ID of the `Business` that owns this queue.
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public userIds: string[],
    public readonly businessId: string,
  ) {}
}
