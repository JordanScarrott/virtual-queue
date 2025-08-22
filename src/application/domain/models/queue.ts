import type { Business } from "./business.ts";

/**
 * Represents a virtual queue or line for a specific service at a business.
 *
 * A queue is a central entity where users are organized in a first-in, first-out
 * manner. It manages the order of users and provides status information.
 *
 * In line with the database-oriented design, this class is a simple data
 * container. It can be enriched with additional properties by adapters for
 * display purposes.
 */
export class Queue {
  /**
   * @param id - A unique identifier for the queue (e.g., a UUID).
   * @param name - A descriptive name for the queue (e.g., "Main Checkout", "Service Desk").
   * @param userIds - An ordered array of user IDs currently in the queue.
   *   The user at index 0 is at the front of the line.
   * @param businessId - The ID of the `Business` that owns this queue.
   * @param business - (Optional) The full `Business` object, often enriched by an adapter.
   * @param userCount - (Optional) The total number of users in the queue, enriched by an adapter.
   * @param estimatedWaitTime - (Optional) The estimated wait time in minutes, enriched by an adapter.
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public userIds: string[],
    public readonly businessId: string,
    public business?: Business,
    public userCount?: number,
    public estimatedWaitTime?: number,
  ) {}
}
