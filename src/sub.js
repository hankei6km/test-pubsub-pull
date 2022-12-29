// https://cloud.google.com/pubsub/docs/create-subscription?hl=ja#pull_subscription
const topicNameOrId = process.env.TOPID;
const subscriptionNameOrId = process.argv[2];
const reqFilter = process.argv[3] || "";
console.log(topicNameOrId);
console.log(subscriptionNameOrId);
console.log(reqFilter);

// Imports the Google Cloud client library
const { PubSub } = require("@google-cloud/pubsub");

// Creates a client; cache this for further use
const pubSubClient = new PubSub({
  projectId: process.env.PROJID,
  keyFilename: "./tmp/key.json",
});

async function createSubscription() {
  // Creates a new subscription
  await pubSubClient
    .topic(topicNameOrId)
    .createSubscription(subscriptionNameOrId, {
      filter: `attributes.reqid = "${reqFilter}"`,
    });
  console.log(`Subscription ${subscriptionNameOrId} created.`);
}

(async () => {
  await createSubscription().catch((err) => {
    console.error(err);
    process.exit(1);
  });
})();
