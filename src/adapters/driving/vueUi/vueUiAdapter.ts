import { QueueApp } from "../../../application/QueueApp.ts";

export class VueUIAdapter {
    queueApp: QueueApp;

    constructor(queueApp: QueueApp) {
        this.queueApp = queueApp;
    }
}
