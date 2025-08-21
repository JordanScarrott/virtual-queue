import type { QueueApiPort } from "../core/ports/queue-api.port.ts";
import type { Business } from "../core/domain/business.ts";
import type { Queue } from "../core/domain/queue.ts";
import type { User } from "../core/domain/user.ts";
import { mockBusinesses, mockQueues, mockUsers } from "./mock-data.ts";

// --- Error Messages ---
const ERROR_QUEUE_NOT_FOUND = "Queue not found";
const ERROR_USER_NOT_FOUND = "User not found";
const ERROR_BUSINESS_NOT_FOUND = "Business not found";

// --- Mock Adapter (Refactored) ---

export class MockQueueApiAdapter implements QueueApiPort {
  private users: User[];
  private businesses: Business[];
  private queues: Record<string, Queue>;

  constructor() {
    // Create deep copies to ensure the adapter manages its own state
    this.users = JSON.parse(JSON.stringify(mockUsers));
    this.businesses = JSON.parse(JSON.stringify(mockBusinesses));
    this.queues = JSON.parse(JSON.stringify(mockQueues));
  }

  // --- Private Helpers ---

  private findQueue(queueId: string): Promise<Queue> {
    const queue = this.queues[queueId];
    return queue
      ? Promise.resolve(queue)
      : Promise.reject(new Error(ERROR_QUEUE_NOT_FOUND));
  }

  private findUser(userId: string): Promise<User> {
    const user = this.users.find((u) => u.id === userId);
    return user
      ? Promise.resolve(user)
      : Promise.reject(new Error(ERROR_USER_NOT_FOUND));
  }

  private findBusiness(businessId: string): Promise<Business> {
      const business = this.businesses.find((b) => b.id === businessId);
      return business
        ? Promise.resolve(business)
        : Promise.reject(new Error(ERROR_BUSINESS_NOT_FOUND));
  }

  // --- Public API ---

  public async getQueueDetails(queueId: string): Promise<Queue> {
    const queue = await this.findQueue(queueId);
    return JSON.parse(JSON.stringify(queue));
  }

  public async joinQueue(userId: string, queueId: string): Promise<Queue> {
    const [queue, user] = await Promise.all([
      this.findQueue(queueId),
      this.findUser(userId),
    ]);

    if (queue.users.some((u) => u.id === userId)) {
      // User is already in the queue, return the current state
      return JSON.parse(JSON.stringify(queue));
    }

    // Immutable update
    const updatedQueue = {
      ...queue,
      users: [...queue.users, user],
    };

    this.queues[queueId] = updatedQueue;
    return JSON.parse(JSON.stringify(updatedQueue));
  }

  public async leaveQueue(userId: string, queueId: string): Promise<void> {
    const queue = await this.findQueue(queueId);

    const userIndex = queue.users.findIndex((u) => u.id === userId);

    if (userIndex > -1) {
      // Immutable update
      const updatedUsers = [
        ...queue.users.slice(0, userIndex),
        ...queue.users.slice(userIndex + 1),
      ];
      const updatedQueue = {
        ...queue,
        users: updatedUsers,
      };
      this.queues[queueId] = updatedQueue;
    }

    return Promise.resolve();
  }

  public async getBusiness(businessId: string): Promise<Business> {
    const business = await this.findBusiness(businessId);
    return JSON.parse(JSON.stringify(business));
  }
}
