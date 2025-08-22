import { QueueApp } from "../../../application/QueueApp.ts";
import { Queue } from "../../../core/domain/models/queue.ts";
import { UiPort } from "../../../core/ports/uiPort.ts";

export class ReactUiAdapter {
    queueApp: QueueApp;

    constructor(queueApp: QueueApp) {
        this.queueApp = queueApp;
    }

    getQueueDetails(queueId: string): Promise<Queue | null> {
        throw new Error("Method not implemented.");
    }

    joinQueue(
        userId: string,
        queueId: string
    ): Promise<{ success: boolean; message: string }> {
        throw new Error("Method not implemented.");
    }

    leaveQueue(userId: string, queueId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getUserQueueStatus(
        userId: string,
        queueId: string
    ): Promise<{ position: number | null; status: string }> {
        throw new Error("Method not implemented.");
    }
}
