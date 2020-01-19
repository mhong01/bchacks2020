import * as functions from "firebase-functions";
import { getUsers, connect, close } from "./db";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const cors = require("cors")();

const accountSid = "ACe58c242e757ca683d6e4cd313a1bbe2a";
const authToken = "84cf1f49b3cfe0eb7d4bb92ad47932ea";
const client = require("twilio")(accountSid, authToken);

export const sendNotificationsEndpont = functions.https.onRequest(
  async (request, response) => {
    cors(request, response, async () => {
      console.log();
      await connect();
      const userId = request.query.userId || "Td9lkJZnveRURQAyBNrmQz1JEBj2";
      const userInfo: any = await getUsers([userId]);

      console.log(userInfo[0].phoneNumber);
      if (userInfo) {
        client.messages
          .create({
            body:
              "Hi there! I am watch out for me if I don't response or move out of dange zone in 20 minutes",
            from: "+15672020458",
            to: "+1" + userInfo[0].phoneNumber
          })
          .then(message => console.log("Hello", message));
      }

      await close();
      response.send("Messadfdfge is sent! v0.0.1");
    });
  }
);
