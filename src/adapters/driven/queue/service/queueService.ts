import { Business } from "../../../../core/domain/models/business.ts";
import { Queue } from "../../../../core/domain/models/queue.ts";

export interface QueueService {
    getQueueDetails(queueId: string): Promise<Queue>;
    joinQueue(userId: string, queueId: string): Promise<Queue>;
    leaveQueue(userId: string, queueId: string): Promise<void>;
    getBusiness(businessId: string): Promise<Business>;
}
