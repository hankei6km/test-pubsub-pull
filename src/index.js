// https://cloud.google.com/pubsub/docs/samples/pubsub-subscriber-async-pull?hl=ja
const subscriptionNameOrId = process.env.SUBID;
const timeout = 120;

const myId = process.argv[2];
console.log(`subscribe: ${myId}`);

// Imports the Google Cloud client library
const { PubSub } = require("@google-cloud/pubsub");

// Creates a client; cache this for further use
const pubSubClient = new PubSub({
  projectId: process.env.PROJID,
  keyFilename: "./tmp/key.json",
});

function listenForMessages() {
  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionNameOrId);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = (message) => {
    if (`${message.data}` === myId) {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${message.attributes}`);
      messageCount += 1;
      // "Ack" (acknowledge receipt of) the message
      message.ack();
    } else {
      console.log(`${myId}: skiped: ${message.data}`);
    }
  };

  // Listen for new messages until timeout is hit
  subscription.on("message", messageHandler);

  setTimeout(() => {
    subscription.removeListener("message", messageHandler);
    console.log(`${myId} : ${messageCount} message(s) received.`);
  }, timeout * 1000);
}

listenForMessages();
