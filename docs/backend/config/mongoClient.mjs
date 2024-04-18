import { MongoClient, ServerApiVersion } from "mongodb";

const connectionURL = "mongodb+srv://Dima:Dumitras123@cluster0.prnlaic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connect();

const db = client.db("test");

export { db, client };

