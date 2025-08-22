import { Business } from "../../../core/domain/models/business.ts";
import { Queue } from "../../../core/domain/models/queue.ts";
import { QueuePort } from "../../../core/ports/queueApiPort.ts";
import { MockQueueService } from "./service/mockQueueService.ts";
import { QueueService } from "./service/queueService.ts";

export class QueueAdapter implements QueuePort {
    queueService: QueueService;

    constructor(queueService: QueueService) {
        this.queueService = queueService;
    }

    async getQueueDetails(queueId: string): Promise<Queue> {
        return await this.queueService.getQueueDetails(queueId);
    }

    async joinQueue(userId: string, queueId: string): Promise<Queue> {
        return await this.queueService.joinQueue(userId, queueId);
    }

    async leaveQueue(userId: string, queueId: string): Promise<void> {
        return await this.queueService.leaveQueue(userId, queueId);
    }

    async getBusiness(businessId: string): Promise<Business> {
        return await this.queueService.getBusiness(businessId);
    }
}
