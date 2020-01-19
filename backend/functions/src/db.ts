import * as functions from "firebase-functions";
import { User } from "./model";
const MongoClient = require("mongodb").MongoClient;

const dbName = "YouCare";
const usersCollection = "users";
const notificationsCollection = "notifications";

const cors = require("cors")();

// const cors = require("cors")({ origin: false });

// Connection URL
const uri =
  "mongodb+srv://bot:thisisPDmb59%21@cluster0-8rmhl.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export async function connect() {
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err === null) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

export async function close() {
  client.close();
}

export const getUsers = (users: string[]) => {
  return new Promise((resolve, reject) => {
    const collection = client.db(dbName).collection(usersCollection);
    collection
      .find({
        id: {
          $in: users
        }
      })
      .toArray(function(err1, docs) {
        resolve(docs);
      });
  });
};

export const getNotifications = userId => {
  return new Promise((resolve, reject) => {
    console.log("1");
    client.connect(err => {
      console.log(err);
      console.log(userId);
      const collection = client.db(dbName).collection(notificationsCollection);
      collection
        .find({
          userId: userId
        })
        .toArray(function(err1, docs) {
          console.log(docs);
          resolve(docs);
        });
    });
  });
};

// --------------------------------------------------------------------

export const addUserEndpoint = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET, POST");
    await connect();

    const user: User = {
      fullName: request.query.fullName,
      phoneNumber: request.query.phoneNumber,
      id: request.query.id,
      email: request.query.email
    };
    console.log(user);
    await addUser(user);

    client.close();
    response.send("true");
  }
);

export const addUser = (user: User) => {
  return new Promise(async (resolve, reject) => {
    const collection = client.db(dbName).collection(usersCollection);
    collection.insertOne(user);
    resolve(true);
  });
};

// --------------------------------------------------------------------
export const addMemberEndpoint = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET, POST");
    await connect();

    await addMember(request.query.userId, request.query.memberId);

    client.close();
    response.send("true");
  }
);

export const addMember = (userId: string, memberId: string) => {
  return new Promise(async (resolve, reject) => {
    const docs: any = await getUsers([userId]);
    const user = docs[0];

    if (
      user["members"] === null ||
      user["members"] === [] ||
      user["members"] === undefined
    ) {
      user["members"] = [memberId];
    }

    const collection = client.db(dbName).collection(usersCollection);
    collection.updateOne(
      { id: userId },
      { $set: { members: user["members"] } }
    );
    resolve(true);
  });
};

// --------------------------------------------------------------------
export const addNotifierEndpoint = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    await connect();

    console.log("2");

    await addNotifier(request.query.userId, request.query.memberId);

    client.close();
    response.send("true");
  }
);

export const addNotifier = (userId: string, memberId: string) => {
  return new Promise(async (resolve, reject) => {
    const docs: any = await getNotifications(userId);
    console.log(docs);

    let notification: any = null;
    const collection = client.db(dbName).collection(notificationsCollection);

    if (docs.length === 0) {
      console.log("insert");
      notification = {
        userId: userId,
        notifiers: [memberId]
      };
      collection.insertOne(notification);
    } else {
      console.log("update");
      notification = docs[0];
      notification["notifiers"].push(memberId);
      console.log(notification);
      collection.findOneAndReplace({ userId: userId }, notification);
    }

    resolve(true);
  });
};

// --------------------------------------------------------------------
export const getNotifierEndpoint = functions.https.onRequest(
  async (request, response) => {
    cors(request, response, async () => {
      await connect();

      response.set("Access-Control-Allow-Origin", "*");
      response.set(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,OPTIONS"
      );

      const users = await getNotifier(request.query.userId);

      client.close();
      response.send(JSON.stringify(users));
    });
  }
);

// export const getNotifierEndpoint = functions.https.onRequest(
//   async (request, response) => {
//     await connect();

//     response.set("Access-Control-Allow-Origin", "*");
//     response.set("Access-Control-Allow-Methods", "GET, POST");

//     const users = await getNotifier(request.query.userId);

//     client.close();
//     response.send(JSON.stringify(users));
//   }
// );

export const getNotifier = (userId: string) => {
  return new Promise(async (resolve, reject) => {
    const docs: any = await getNotifications(userId);
    console.log("Got it");
    console.log(docs);

    if (docs.length === 0) {
      resolve([]);
    } else {
      const users = getUsers(docs[0]["notifiers"]);
      resolve(users);
    }
  });
};

// const docs = await getNotifications("Td9lkJZnveRURQAyBNrmQz1JEBj2");

// const docs = await getUsers([
//   "AsJbpOKsIyfNPq7e0AY69wKW9Z53",
//   "r09rvW7pWQY6BsjQwnbHmrsr8gh1"
// ]);
