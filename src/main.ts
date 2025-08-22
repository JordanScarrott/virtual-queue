import { MockAuthAdapter } from "./adapters/auth/mock.adapter.ts";
import { MockQueueApiAdapter } from "./adapters/mock-queue-api.adapter.ts";
import { CliAdapter } from "./adapters/driving/cli.adapter.ts";
import type { Queue } from "./core/domain/queue.ts";

async function main() {
  console.log("--- Initializing Mock Adapters and CLI Adapter ---");
  const authAdapter = new MockAuthAdapter();
  const queueApiAdapter = new MockQueueApiAdapter();
  const app = new CliAdapter(authAdapter, queueApiAdapter);

  const charlieId = "user-3";
  const aliceId = "user-1";
  const coffeeQueueId = "q-1";

  const printQueueDetails = (queue: Queue | null) => {
    if (!queue) {
      console.log("Queue not found or error fetching details.");
      return;
    }
    console.log("Queue Details:", {
      id: queue.id,
      name: queue.name,
      business: queue.business?.name,
      userCount: queue.userCount,
      estimatedWaitTime: `${queue.estimatedWaitTime} mins`,
      userIds: queue.userIds.join(", "),
    });
  };

  console.log("\n--- Scenario Start ---");

  // 1. Charlie checks the coffee queue details
  console.log(`\n1. Charlie (${charlieId}) checks details for queue: ${coffeeQueueId}`);
  let details = await app.getQueueDetails(coffeeQueueId);
  printQueueDetails(details);

  // 2. Charlie joins the queue
  console.log(`\n2. Charlie (${charlieId}) joins queue: ${coffeeQueueId}`);
  const joinStatus = await app.joinQueue(charlieId, coffeeQueueId);
  console.log("Join Status:", joinStatus);

  // 3. Charlie checks his status
  console.log(`\n3. Charlie (${charlieId}) checks his status in queue: ${coffeeQueueId}`);
  let status = await app.getUserQueueStatus(charlieId, coffeeQueueId);
  console.log("Charlie's Status:", status);

  // 4. Check queue details again
  console.log("\n4. Verifying queue details after Charlie joined...");
  details = await app.getQueueDetails(coffeeQueueId);
  printQueueDetails(details);

  // 5. Alice leaves the queue
  console.log(`\n5. Alice (${aliceId}) leaves queue: ${coffeeQueueId}`);
  await app.leaveQueue(aliceId, coffeeQueueId);
  console.log("Alice has left.");

  // 6. Check queue details again
  console.log("\n6. Verifying queue details after Alice left...");
  details = await app.getQueueDetails(coffeeQueueId);
  printQueueDetails(details);

  // 7. Charlie checks his status again
  console.log(`\n7. Charlie (${charlieId}) checks his status again...`);
  status = await app.getUserQueueStatus(charlieId, coffeeQueueId);
  console.log("Charlie's New Status:", status);

  console.log("\n--- Scenario End ---");
}

main().catch((error) => {
  console.error("An error occurred during the simulation:", error);
});
