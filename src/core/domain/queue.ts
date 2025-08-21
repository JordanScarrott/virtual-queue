import { Business } from "./business.ts";

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

/**
 * Provides a more detailed view of a queue, suitable for displaying to users.
 *
 * This type combines the core `Queue` information with additional computed
 * properties like the total number of users and the estimated wait time.
 */
export type QueueDetails = Queue & {
  business: Business;
  userCount: number;
  estimatedWaitTime: number; // in minutes
};
