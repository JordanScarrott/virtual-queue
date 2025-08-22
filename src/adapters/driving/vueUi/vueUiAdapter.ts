import { QueueApp } from "../../../application/QueueApp.ts";
import { Queue } from "../../../application/domain/models/queue.ts";

/**
 * A driving adapter for a Vue.js UI.
 * This adapter is responsible for two things:
 * 1. Calling methods on the core application (`QueueApp`) in response to user actions in the UI.
 * 2. Listening for events from the core application to update the UI's state.
 */
export class VueUIAdapter {
    // The instance of the core application. The adapter calls methods on this object.
    queueApp: QueueApp;

    constructor(queueApp: QueueApp) {
        this.queueApp = queueApp;
    }

    /**
     * Connects the adapter to the core application's event stream.
     * In a real Vue application, this would likely be called in the main entry point
     * or a dedicated service that initializes the application's state.
     */
    listen() {
        console.log("VueUIAdapter is listening for events from the core application...");

        this.queueApp.on("queue-updated", (updatedQueue: Queue) => {
            console.log("EVENT RECEIVED: queue-updated", updatedQueue);
            //
            // --- Pinia Store Integration Point ---
            // In a real Vue application, you would now update your Pinia store
            // with the new queue data.
            //
            // Example:
            // const queueStore = useQueueStore();
            // queueStore.setQueue(updatedQueue);
            //
        });

        this.queueApp.on("error", (error: Error) => {
            console.error("EVENT RECEIVED: error", error);
            //
            // --- UI Notification Integration Point ---
            // In a real Vue application, you would now use a notification
            // library (like a toast) to display the error to the user.
            //
            // Example:
            // toast.error(error.message);
            //
        });
    }
}
