import { EventEmitter } from "https://deno.land/std@0.224.0/event/mod.ts";
import { AuthPort } from "./ports/driven/authPort.ts";
import { QueuePort } from "./ports/driven/queueApiPort.ts";
import { UiPort } from "./ports/driving/uiPort.ts";
import { Queue } from "./domain/models/queue.ts";

// Define the events that our application can emit
type QueueAppEvents = {
    "queue-updated": [Queue];
    "error": [Error];
};

export class QueueApp extends EventEmitter<QueueAppEvents> implements UiPort {
    authAdapter: AuthPort;
    queueAdapter: QueuePort;

    constructor(authAdapter: AuthPort, queueAdapter: QueuePort) {
        super();
        this.authAdapter = authAdapter;
        this.queueAdapter = queueAdapter;
    }

    async getQueueDetails(queueId: string): Promise<Queue | null> {
        try {
            const queue = await this.queueAdapter.getQueueDetails(queueId);
            return queue;
        } catch (error) {
            console.error(`Error fetching details for queue ${queueId}:`, error);
            this.emit("error", error);
            return null;
        }
    }

    async joinQueue(userId: string, queueId: string): Promise<{ success: boolean; message: string }> {
        try {
            // First, check if the user is already in the queue
            const queue = await this.queueAdapter.getQueueDetails(queueId);
            if (queue.users.some(user => user.id === userId)) {
                return { success: false, message: "User is already in the queue." };
            }
            await this.queueAdapter.joinQueue(userId, queueId);

            // On success, fetch the updated queue and emit an event
            const updatedQueue = await this.queueAdapter.getQueueDetails(queueId);
            this.emit("queue-updated", updatedQueue);

            return { success: true, message: "Successfully joined the queue." };
        } catch (error) {
            console.error(`Error joining queue ${queueId} for user ${userId}:`, error);
            this.emit("error", error);
            return { success: false, message: "An unexpected error occurred." };
        }
    }

    async leaveQueue(userId: string, queueId: string): Promise<void> {
        try {
            await this.queueAdapter.leaveQueue(userId, queueId);

            // On success, fetch the updated queue and emit an event
            const updatedQueue = await this.queueAdapter.getQueueDetails(queueId);
            this.emit("queue-updated", updatedQueue);

        } catch (error) {
            console.error(`Error leaving queue ${queueId} for user ${userId}:`, error);
            this.emit("error", error);
        }
    }

    async getUserQueueStatus(userId: string, queueId: string): Promise<{ position: number | null; status: string }> {
        try {
            const queue = await this.queueAdapter.getQueueDetails(queueId);
            const userIndex = queue.users.findIndex(user => user.id === userId);

            if (userIndex === -1) {
                return { position: null, status: "User not in queue." };
            }

            return { position: userIndex + 1, status: "In queue." };
        } catch (error) {
            console.error(`Error getting status for user ${userId} in queue ${queueId}:`, error);
            return { position: null, status: "Error retrieving queue status." };
        }
    }
}
