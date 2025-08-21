import type { Business } from "../core/domain/business.ts";
import type { Queue } from "../core/domain/queue.ts";
import type { User } from "../core/domain/user.ts";

export const mockUsers: User[] = [
  { id: "user-1", name: "Alice" },
  { id: "user-2", name: "Bob" },
  { id: "user-3", name: "Charlie" },
];

export const mockBusinesses: Business[] = [
  {
    id: "biz-1",
    name: "The Coffee Shop",
    queues: ["q-1"],
  },
  {
    id: "biz-2",
    name: "The Burger Joint",
    queues: ["q-2", "q-3"],
  },
];

export const mockQueues: Record<string, Queue> = {
  "q-1": {
    id: "q-1",
    name: "Main Counter",
    businessId: "biz-1",
    users: [mockUsers[0], mockUsers[1]],
  },
  "q-2": {
    id: "q-2",
    name: "Dine-In Orders",
    businessId: "biz-2",
    users: [],
  },
  "q-3": {
    id: "q-3",
    name: "Takeout Orders",
    businessId: "biz-2",
    users: [mockUsers[2]],
  },
};
