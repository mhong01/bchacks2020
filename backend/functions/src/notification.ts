import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const sendNotificationsEndpont = functions.https.onRequest(
  (request, response) => {
    const accountSid = 'ACe58c242e757ca683d6e4cd313a1bbe2a';
    const authToken = '84cf1f49b3cfe0eb7d4bb92ad47932ea';
    const client = require('twilio')(accountSid, authToken);
    client.messages
    .create({
      body: 'Hi there! I am in danger now. Please help me', 
      from: '+15672020458', 
      to: "+16045629489"
    }).then(message => console.log("Hello", message));
    response.send("Messadfdfge is sent! v0.0.1");
  }
);
