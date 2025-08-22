import { AuthAdapter } from "./adapters/driven/auth/authAdapter.ts";
import { MockAuthService } from "./adapters/driven/auth/service/mockAuthService.ts";
import { QueueAdapter } from "./adapters/driven/queue/queueAdapter.ts";
import { MockQueueService } from "./adapters/driven/queue/service/mockQueueService.ts";
import { ReactUiAdapter } from "./adapters/driving/reactUi/reactUIAdapter.ts";
import { VueUIAdapter } from "./adapters/driving/vueUi/vueUiAdapter.ts";
import {
    generateNBusinesses,
    generateNQueuesPerBusiness,
    generateNUsers,
} from "./application/domain/utils/mock-data.ts";
import { QueueApp } from "./application/QueueApp.ts";

// 1. --- Create Mock Data ---
// In a real application, this data would come from a database.
const users = generateNUsers(10);
const businesses = generateNBusinesses(5);
const queues = generateNQueuesPerBusiness(3, businesses);

// 2. --- Set up Driven Adapters ---
// These are the concrete implementations of the ports our application depends on.
const authAdapter = new AuthAdapter(new MockAuthService(users));
const queueAdapter = new QueueAdapter(new MockQueueService(queues, businesses));

// 3. --- Instantiate the Core Application ---
// The `QueueApp` is the central "hexagon" of our architecture.
const app = new QueueApp(authAdapter, queueAdapter);

// 4. --- Set up Driving Adapters ---
// These adapters will drive the application. Here, we simulate two different UIs.
const ui1 = new VueUIAdapter(app);
const ui2 = new ReactUiAdapter(app); // Note: ReactUiAdapter is not implemented yet.

// 5. --- Connect Adapters to the Core ---
// The driving adapters start listening for events from the core application.
ui1.listen();

// 6. --- Simulate a UI Interaction ---
// To demonstrate the full event flow, we'll simulate a user joining a queue
// after a short delay. This will trigger a `queue-updated` event, which the
// `VueUIAdapter` will receive.
console.log("\n--- Simulating a user joining a queue in 2 seconds... ---");
setTimeout(async () => {
    const userToJoin = users[0];
    const queueToJoin = queues[0];
    console.log(`ACTION: User ${userToJoin.name} is attempting to join queue ${queueToJoin.name}...`);
    await app.joinQueue(userToJoin.id, queueToJoin.id);
}, 2000);
