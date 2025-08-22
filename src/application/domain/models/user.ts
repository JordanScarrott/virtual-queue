/**
 * Represents an end-user who can join and participate in one or more queues.
 *
 * A user is an individual who scans a QR code to join a virtual line for a
 * service offered by a `Business`.
 */
export class User {
  /**
   * @param id - A unique identifier for the user (e.g., a UUID or a device ID).
   * @param queues - An array of queue IDs that the user is currently a part of.
   * @param name - An optional, user-provided name for display purposes (e.g., "John D.").
   */
  constructor(
    public readonly id: string,
    public queues: string[],
    public name?: string,
  ) {}
}
