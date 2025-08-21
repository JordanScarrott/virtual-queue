import type { Queue } from "../domain/queue.ts";

/**
 * Defines the contract for interacting with the backend queue management system.
 * This is a "Driven Port" in the Ports and Adapters architecture, meaning it is
 * called by the core application to interact with external services.
 */
export interface QueueApiPort {
  /**
   * Fetches the full details of a specific queue from the data source.
   * @param queueId - The unique identifier of the queue to fetch.
   * @returns A promise that resolves to the `Queue` object.
   */
  fetchQueueDetails(queueId: string): Promise<Queue>;
}
