import { Business } from "../../../../core/domain/models/business.ts";
import { Queue } from "../../../../core/domain/models/queue.ts";
import { QueueService } from "./queueService.ts";

export class MockQueueService implements QueueService {
    queues: Queue[];
    businesses: Business[];

    constructor(queues: Queue[], businesses: Business[]) {
        this.queues = queues;
        this.businesses = businesses;
    }

    getQueueDetails(queueId: string): Promise<Queue> {
        throw new Error("Method not implemented.");
    }

    joinQueue(userId: string, queueId: string): Promise<Queue> {
        throw new Error("Method not implemented.");
    }

    leaveQueue(userId: string, queueId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getBusiness(businessId: string): Promise<Business> {
        throw new Error("Method not implemented.");
    }
}
