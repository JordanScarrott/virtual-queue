import type { QueueApiPort } from "../core/ports/queue-api.port.ts";
import type { Business } from "../core/domain/business.ts";
import { Queue } from "../core/domain/queue.ts";
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
  private queues: Record<string, any>; // Internal state uses mock data shape

  constructor() {
    // Create deep copies to ensure the adapter manages its own state
    this.users = JSON.parse(JSON.stringify(mockUsers));
    this.businesses = JSON.parse(JSON.stringify(mockBusinesses));
    this.queues = JSON.parse(JSON.stringify(mockQueues));
  }

  // --- Private Helpers ---

  private async findQueue(queueId: string): Promise<Queue> {
    const mockQueue = this.queues[queueId];
    if (!mockQueue) {
      return Promise.reject(new Error(ERROR_QUEUE_NOT_FOUND));
    }
    // Adapt the mock data structure to the domain `Queue` class
    const userIds = mockQueue.users.map((u: User) => u.id);
    const domainQueue = new Queue(
      mockQueue.id,
      mockQueue.name,
      userIds,
      mockQueue.businessId,
    );
    return Promise.resolve(domainQueue);
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
    return this.findQueue(queueId);
  }

  public async joinQueue(userId: string, queueId: string): Promise<Queue> {
    await this.findUser(userId); // Ensure user exists
    const mockQueue = this.queues[queueId];
    if (!mockQueue) {
      throw new Error(ERROR_QUEUE_NOT_FOUND);
    }

    const userIsInQueue = mockQueue.users.some((u: User) => u.id === userId);
    if (!userIsInQueue) {
      const userToAdd = this.users.find(u => u.id === userId);
      if (userToAdd) {
        mockQueue.users.push(userToAdd);
      }
    }

    return this.findQueue(queueId);
  }

  public async leaveQueue(userId: string, queueId: string): Promise<void> {
    const mockQueue = this.queues[queueId];
    if (!mockQueue) {
      throw new Error(ERROR_QUEUE_NOT_FOUND);
    }

    const userIndex = mockQueue.users.findIndex((u: User) => u.id === userId);
    if (userIndex > -1) {
      mockQueue.users.splice(userIndex, 1);
    }

    return Promise.resolve();
  }

  public async getBusiness(businessId: string): Promise<Business> {
    const business = await this.findBusiness(businessId);
    return JSON.parse(JSON.stringify(business));
  }
}
