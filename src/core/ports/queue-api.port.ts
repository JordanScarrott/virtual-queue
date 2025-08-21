import { Queue } from "../domain/queue.ts";

/**
 * Port for interacting with the backend queue management system.
 * This interface defines the contract for fetching queue data.
 */
export interface QueueApiPort {
  /**
   * Fetches the details of a specific queue.
   * @param queueId The unique identifier of the queue to fetch.
   * @returns A Promise that resolves to the Queue object.
   */
  fetchQueueDetails(queueId: string): Promise<Queue>;
}
