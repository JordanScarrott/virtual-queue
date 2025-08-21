import type { AppPort } from "../../core/ports/app.port.ts";
import type { AuthPort } from "../../core/ports/auth.port.ts";
import type { QueueApiPort } from "../../core/ports/queue-api.port.ts";
import type { Queue } from "../../core/domain/queue.ts";

const ESTIMATED_WAIT_TIME_PER_USER = 5; // 5 minutes

/**
 * A driving adapter that implements the `AppPort` for a Command-Line Interface (CLI).
 *
 * This class contains the application logic that orchestrates calls to the driven
 * ports (`AuthPort`, `QueueApiPort`) in response to user commands.
 */
export class CliAdapter implements AppPort {
  constructor(
    private readonly authPort: AuthPort,
    private readonly queueApiPort: QueueApiPort,
  ) {}

  public async getQueueDetails(queueId: string): Promise<Queue | null> {
    try {
      const queue = await this.queueApiPort.getQueueDetails(queueId);
      const business = await this.queueApiPort.getBusiness(queue.businessId);

      // Enrich the queue object with additional details
      queue.business = business;
      queue.userCount = queue.userIds.length;
      queue.estimatedWaitTime = queue.userCount * ESTIMATED_WAIT_TIME_PER_USER;

      return queue;
    } catch (error) {
      console.error(`Error fetching details for queue ${queueId}:`, error.message);
      return null;
    }
  }

  public async joinQueue(userId: string, queueId: string) {
    const queue = await this.queueApiPort.getQueueDetails(queueId);
    if (!queue) {
      return { success: false, message: "Queue not found." };
    }

    if (queue.userIds.includes(userId)) {
      return { success: false, message: "User is already in the queue." };
    }

    await this.queueApiPort.joinQueue(userId, queueId);
    return { success: true, message: "Successfully joined the queue." };
  }

  public async leaveQueue(userId: string, queueId: string): Promise<void> {
    await this.queueApiPort.leaveQueue(userId, queueId);
  }

  public async getUserQueueStatus(userId: string, queueId: string) {
    const queue = await this.queueApiPort.getQueueDetails(queueId);
    if (!queue) {
      return { position: null, status: "Queue not found." };
    }

    const userIndex = queue.userIds.indexOf(userId);
    if (userIndex === -1) {
      return { position: null, status: "Not in queue." };
    }

    const position = userIndex + 1;
    const status = position === 1 ? "At the front of the queue." : `Position ${position} in queue.`;
    return { position, status };
  }
}
