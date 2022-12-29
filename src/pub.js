// https://cloud.google.com/pubsub/docs/samples/pubsub-subscriber-async-pull?hl=ja
const topicNameOrId = process.env.TOPID;

const reqid = process.argv[2] || "dummy";
const data = process.argv[3] || JSON.stringify({ foo: "bar" });
console.log(`reqid: ${reqid}`);
console.log(`data: ${data}`);

// Imports the Google Cloud client library
const { PubSub } = require("@google-cloud/pubsub");

// Creates a client; cache this for further use
const pubSubClient = new PubSub({
  projectId: process.env.PROJID,
  keyFilename: "./tmp/key.json",
});

async function publishMessageWithCustomAttributes() {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  // Add some custom attributes to the message
  const customAttributes = {
    reqid,
    username: "gcp",
  };

  const messageId = await pubSubClient
    .topic(topicNameOrId)
    .publish(dataBuffer, customAttributes);
  console.log(`Message ${messageId} published.`);
}

publishMessageWithCustomAttributes().catch(console.error);
