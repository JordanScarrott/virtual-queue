import { Queue } from "../../domain/models/queue.ts";

/**
 * Defines the contract for the primary driving port of the application.
 *
 * This interface is implemented by driving adapters (e.g., a CLI, a web server)
 * and exposes all the core functionalities of the application to the outside
 * world.
 */
export interface UiPort {
    /**
     * Retrieves the full, enriched details of a specific queue.
     * @param queueId - The unique identifier of the queue to fetch.
     * @returns A promise that resolves to the enriched `Queue` object, or `null` if not found.
     */
    getQueueDetails(queueId: string): Promise<Queue | null>;

    /**
     * Adds a user to a specific queue.
     * @param userId - The ID of the user joining the queue.
     * @param queueId - The ID of the queue to join.
     * @returns A promise that resolves to an object indicating success and a message.
     */
    joinQueue(
        userId: string,
        queueId: string
    ): Promise<{ success: boolean; message: string }>;

    /**
     * Removes a user from a specific queue.
     * @param userId - The ID of the user leaving the queue.
     * @param queueId - The ID of the queue to leave.
     * @returns A promise that resolves when the operation is complete.
     */
    leaveQueue(userId: string, queueId: string): Promise<void>;

    /**
     * Gets the status of a user within a specific queue.
     * @param userId - The ID of the user.
     * @param queueId - The ID of the queue.
     * @returns A promise that resolves to an object containing the user's position and status.
     */
    getUserQueueStatus(
        userId: string,
        queueId: string
    ): Promise<{ position: number | null; status: string }>;
}
