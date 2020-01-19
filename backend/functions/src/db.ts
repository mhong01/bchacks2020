import * as functions from "firebase-functions";
const MongoClient = require("mongodb").MongoClient;

const dbName = "YouCare";
const usersCollection = "users";

// Connection URL
const uri =
  "mongodb+srv://bot:thisisPDmb59%21@cluster0-8rmhl.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  console.log(err);
});

export const addUserToNotificationEndpont = functions.https.onRequest(
  (request, response) => {
    // Send data to twillio
    // console.info("yessss");
    // const collection = client.db(dbName).collection("notifications");
    // collection.insertOne({
    //   userId: "id"
    // });
    // console.log("yessss");

    getUsers([]);

    response.send("Message is sent! v0.0.2");
  }
);

export const getUsers = (users: string[]) => {
  const collection = client.db(dbName).collection(usersCollection);
  const data = collection.find({
    id: ["r09rvW7pWQY6BsjQwnbHmrsr8gh1", "AsJbpOKsIyfNPq7e0AY69wKW9Z53"]
  });
  console.log(data);
};
