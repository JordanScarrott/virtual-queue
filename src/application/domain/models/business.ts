/**
 * Represents a business entity that owns and manages multiple queues.
 *
 * A business is the top-level entity in the queueing system. It provides a context
 * for organizing and controlling access to various services or lines.
 */
export class Business {
  /**
   * @param id - A unique identifier for the business (e.g., a UUID).
   * @param name - The public-facing name of the business (e.g., "The Coffee Shop").
   * @param queueIds - An array of queue IDs associated with this business.
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public queueIds: string[],
  ) {}
}
