import { AuthAdapter } from "./adapters/driven/auth/authAdapter.ts";
import { MockAuthService } from "./adapters/driven/auth/service/mockAuthService.ts";
import { QueueAdapter } from "./adapters/driven/queue/queueAdapter.ts";
import { MockQueueService } from "./adapters/driven/queue/service/mockQueueService.ts";
import { ReactUiAdapter } from "./adapters/driving/reactUi/reactUIAdapter.ts";
import { VueUIAdapter } from "./adapters/driving/vueUi/vueUiAdapter.ts";
import {
    generateNBusinesses,
    generateNQueuesPerBusiness,
} from "./application/domain/utils/mock-data.ts";
import { QueueApp } from "./application/QueueApp.ts";
import { generateNUsers } from "./core/domain/utils/mock-data.ts";

const users = generateNUsers(10);
const businesses = generateNBusinesses(5);
const queues = generateNQueuesPerBusiness(3, businesses);

const authAdapter = new AuthAdapter(new MockAuthService(users));
const queueAdapter = new QueueAdapter(new MockQueueService(queues, businesses));

const app = new QueueApp(authAdapter, queueAdapter);
const ui1 = new VueUIAdapter(app);
const ui2 = new ReactUiAdapter(app);
