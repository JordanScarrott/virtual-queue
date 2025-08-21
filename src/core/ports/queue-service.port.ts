import { Queue, QueueDetails } from "../domain/queue.ts";
import { User } from "../domain/user.ts";
import { QueueStatus } from "../domain/queue-status.ts";

export interface QueueServicePort {
  getQueueDetails(queueId: string): Promise<QueueDetails>;
  joinQueue(userId: string, queueId: string): Promise<QueueStatus>;
  leaveQueue(userId: string, queueId: string): Promise<void>;
  getQueueStatus(userId: string, queueId: string): Promise<QueueStatus>;
}
