import { MongoClient, ServerApiVersion } from "mongodb";

const connectionURL = "mongodb://localhost:27017/";
const client = new MongoClient(connectionURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    // Connect to the MongoDB server
    await client.connect();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connect();

const db = client.db("test");
const coll = db.collection("Students");

export { client, connect, coll };

