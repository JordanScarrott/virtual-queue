import { AuthPort } from "./ports/driven/authPort.ts";
import { QueuePort } from "./ports/driven/queueApiPort.ts";

export class QueueApp {
    authAdapter: AuthPort;
    queueAdapter: QueuePort;

    constructor(authAdapter: AuthPort, queueAdapter: QueuePort) {
        this.authAdapter = authAdapter;
        this.queueAdapter = queueAdapter;
    }
}
