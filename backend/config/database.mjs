// Replace the uri string with your connection string.
import mongoose from "mongoose";
const uri = "mongodb://localhost:27017";

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default run;