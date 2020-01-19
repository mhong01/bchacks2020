import * as functions from "firebase-functions";
const MongoClient = require("mongodb").MongoClient;

const dbName = "YouCare";
const usersCollection = "users";
const notificationsCollection = "notifications";

// Connection URL
const uri =
  "mongodb+srv://bot:thisisPDmb59%21@cluster0-8rmhl.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(err => {
  console.log(err);
});

export const addUserToNotificationEndpont = functions.https.onRequest(
  async (request, response) => {
    // const docs = await getUsers([
    //   "Td9lkJZnveRURQAyBNrmQz1JEBj2",
    //   "AsJbpOKsIyfNPq7e0AY69wKW9Z53"
    // ]);
    const docs = await getNotifications("Td9lkJZnveRURQAyBNrmQz1JEBj2");
    response.send(docs);
  }
);

export const getUsers = (users: string[]) => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      console.log(err);
      console.log("hello 1");
      const collection = client.db(dbName).collection(usersCollection);
      collection
        .find({
          id: {
            $in: users
          }
        })
        .toArray(function(err, docs) {
          client.close();
          resolve(docs);
        });
    });
  });
};

export const getNotifications = userId => {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      console.log(err);
      console.log("hello 1");
      const collection = client.db(dbName).collection(notificationsCollection);
      collection
        .find({
          userId: userId
        })
        .toArray(function(err, docs) {
          client.close();
          resolve(docs);
        });
    });
  });
};
