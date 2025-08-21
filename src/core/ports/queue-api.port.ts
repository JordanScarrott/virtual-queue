import type { Business } from "../domain/business.ts";
import type { Queue } from "../domain/queue.ts";
import type { User } from "../domain/user.ts";

/**
 * Defines the contract for interacting with the backend queue management system.
 * This is a "Driven Port" in the Ports and Adapters architecture, meaning it is
 * called by the core application to interact with external services.
 */
export interface QueueApiPort {
  /**
   * Retrieves the full details of a specific queue from the data source.
   * @param queueId - The unique identifier of the queue to fetch.
   * @returns A promise that resolves to the `Queue` object.
   */
  getQueueDetails(queueId: string): Promise<Queue>;

  /**
   * Adds a user to a specific queue.
   * @param userId - The ID of the user joining the queue.
   * @param queueId - The ID of the queue to join.
   * @returns A promise that resolves to the updated `Queue` object.
   */
  joinQueue(userId: string, queueId: string): Promise<Queue>;

  /**
   * Removes a user from a specific queue.
   * @param userId - The ID of the user leaving the queue.
   * @param queueId - The ID of the queue to leave.
   * @returns A promise that resolves when the operation is complete.
   */
  leaveQueue(userId: string, queueId: string): Promise<void>;

  /**
   * Retrieves the full details of a specific business from the data source.
   * @param businessId - The unique identifier of the business to fetch.
   * @returns A promise that resolves to the `Business` object.
   */
  getBusiness(businessId: string): Promise<Business>;
}
