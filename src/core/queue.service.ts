import { AuthPort } from "./ports/auth.port.ts";
import { QueueApiPort } from "./ports/queue-api.port.ts";
import { QueueServicePort } from "./ports/queue-service.port.ts";
import { QueueDetails } from "./domain/queue.ts";
import { QueueStatus } from "./domain/queue-status.ts";

const ESTIMATED_WAIT_TIME_PER_USER = 5; // 5 minutes

export class QueueService implements QueueServicePort {
  constructor(
    private readonly authPort: AuthPort,
    private readonly queueApiPort: QueueApiPort,
  ) {}

  public async getQueueDetails(queueId: string): Promise<QueueDetails> {
    const queue = await this.queueApiPort.getQueueDetails(queueId);
    if (!queue) {
      throw new Error("Queue not found");
    }

    const business = await this.queueApiPort.getBusiness(queue.businessId);
    if (!business) {
      throw new Error("Business not found for this queue");
    }

    const userCount = queue.userIds.length;
    const estimatedWaitTime = userCount * ESTIMATED_WAIT_TIME_PER_USER;

    return {
      ...queue,
      business,
      userCount,
      estimatedWaitTime,
    };
  }

  public async joinQueue(userId: string, queueId: string): Promise<QueueStatus> {
    const queue = await this.queueApiPort.getQueueDetails(queueId);
    if (!queue) {
      return "QUEUE_NOT_FOUND";
    }

    const isAlreadyInQueue = queue.userIds.includes(userId);
    if (isAlreadyInQueue) {
      return "ALREADY_IN_QUEUE";
    }

    await this.queueApiPort.joinQueue(userId, queueId);
    return "IN_QUEUE";
  }

  public async leaveQueue(userId: string, queueId: string): Promise<void> {
    await this.queueApiPort.leaveQueue(userId, queueId);
  }

  public async getQueueStatus(userId: string, queueId: string): Promise<QueueStatus> {
    const queue = await this.queueApiPort.getQueueDetails(queueId);
    if (!queue) {
      return "QUEUE_NOT_FOUND";
    }

    const userIndex = queue.userIds.indexOf(userId);
    if (userIndex === -1) {
      return "NOT_IN_QUEUE";
    }
    if (userIndex === 0) {
      return "AT_FRONT";
    }
    return "IN_QUEUE";
  }
}
