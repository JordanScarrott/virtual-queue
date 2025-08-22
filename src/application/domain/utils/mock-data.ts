import { v7 as uuid } from "uuid";
// --- Data Transfer Object (DTO) Definitions ---
// These are the classes you provided.

/**
 * Represents a business entity that owns and manages multiple queues.
 */
export class Business {
    /**
     * @param id - A unique identifier for the business (e.g., a UUID).
     * @param name - The public-facing name of the business (e.g., "The Coffee Shop").
     * @param queueIds - An array of queue IDs associated with this business.
     */
    constructor(
        public readonly id: string,
        public readonly name: string,
        public queueIds: string[]
    ) {}
}

/**
 * Represents an end-user who can join and participate in one or more queues.
 */
export class User {
    /**
     * @param id - A unique identifier for the user (e.g., a UUID or a device ID).
     * @param queues - An array of queue IDs that the user is currently a part of.
     * @param name - An optional, user-provided name for display purposes (e.g., "John D.").
     */
    constructor(
        public readonly id: string,
        public queues: string[],
        public name?: string
    ) {}
}

/**
 * Represents a virtual queue or line for a specific service at a business.
 */
export class Queue {
    /**
     * @param id - A unique identifier for the queue (e.g., a UUID).
     * @param name - A descriptive name for the queue (e.g., "Main Checkout", "Service Desk").
     * @param userIds - An ordered array of user IDs currently in the queue.
     * @param businessId - The ID of the `Business` that owns this queue.
     * @param business - (Optional) The full `Business` object.
     * @param userCount - (Optional) The total number of users in the queue.
     * @param estimatedWaitTime - (Optional) The estimated wait time in minutes.
     */
    constructor(
        public readonly id: string,
        public readonly name: string,
        public userIds: string[],
        public readonly businessId: string,
        public business?: Business,
        public userCount?: number,
        public estimatedWaitTime?: number
    ) {}
}

/**
 * Picks a random item from an array.
 * @param arr The array to pick from.
 * @returns A random element from the array.
 */
const getRandomElement = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};

// --- Blank Test Data Pools ---

const USER_NAMES = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
];
const BUSINESS_NAMES = [
    "Global Tech Inc.",
    "Sunrise Coffee",
    "City General Hospital",
    "Quick-E Mart",
    "The Book Nook",
    "Downtown Diner",
];
const QUEUE_NAMES = [
    "Main Checkout",
    "Customer Service",
    "Pharmacy Pickup",
    "Returns Desk",
    "Appointments",
    "Express Lane",
];

// --- Single Instance Generators ---

/**
 * Creates a single mock User instance from the test data pool.
 * @returns A new `User` instance.
 */
const createMockUser = (): User => {
    return new User(uuid(), [], getRandomElement(USER_NAMES));
};

/**
 * Creates a single mock Business instance from the test data pool.
 * @returns A new `Business` instance.
 */
const createMockBusiness = (): Business => {
    return new Business(uuid(), getRandomElement(BUSINESS_NAMES), []);
};

/**
 * Creates a single mock Queue instance from the test data pool.
 * @param businessId - The ID of the business this queue belongs to.
 * @returns A new `Queue` instance.
 */
const createMockQueue = (businessId: string): Queue => {
    return new Queue(uuid(), getRandomElement(QUEUE_NAMES), [], businessId);
};

// --- N-Instance Generator Functions ---

/**
 * Generates an array of N mock `User` objects.
 * @param n - The number of users to generate.
 * @returns An array of `User` instances.
 */
export const generateNUsers = (n: number): User[] => {
    return Array.from({ length: n }, createMockUser);
};

/**
 * Generates an array of N mock `Business` objects.
 * @param n - The number of businesses to generate.
 * @returns An array of `Business` instances.
 */
export const generateNBusinesses = (n: number): Business[] => {
    return Array.from({ length: n }, createMockBusiness);
};

/**
 * Generates an array of N mock `Queue` objects for a given business.
 * @param n - The number of queues to generate.
 * @param businessId - The ID of the business these queues belong to.
 * @returns An array of `Queue` instances.
 */
export const generateNQueues = (n: number, businessId: string): Queue[] => {
    return Array.from({ length: n }, () => createMockQueue(businessId));
};

/**
 * Takes a bunch of businesses and generates N queues per business.
 * @param n
 * @param businesses
 * @returns
 */
export const generateNQueuesPerBusiness = (
    n: number,
    businesses: Business[]
): Queue[] => {
    return businesses.flatMap((b) => generateNQueues(n, b.id));
};
