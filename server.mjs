import express from "express";
import bodyParser from "body-parser";
import { client } from "./backend/config/mongoClient.mjs";
import insertOne from "./backend/CRUD/insert.mjs";
import getUsers from "./backend/CRUD/read.mjs";

const app = express();

app.use(bodyParser.json());
app.use(express.static("frontend/public"));

const port = 3000;

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});

app.get("/M00888146", async (req, res, next) => {
  try {
    const cursor = await getUsers();
    res.send(cursor);
  } catch (error) {
    next(error);
  }
});

app.post("/M00888146", async (req, res, next) => {
  try {
    await insertOne();
    res.send({message: "Student was successfully added to the database."});
  } catch (error) {
    next(error);
  }
});

// Error handling middleware to catch any unhandled errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Clean up MongoDB client when the process exits
process.on("exit", () => {
  try {
    client.close();
  } catch (error) {
    console.error("Error closing MongoDB client:", error);
  }
});

// Clean up MongoDB client when receiving any of the following signals
[
  "SIGHUP",
  "SIGINT",
  "SIGQUIT",
  "SIGILL",
  "SIGTRAP",
  "SIGABRT",
  "SIGBUS",
  "SIGFPE",
  "SIGUSR1",
  "SIGSEGV",
  "SIGUSR2",
  "SIGTERM",
].forEach(function (signal) {
  process.on(signal, function () {
    client.close();
    process.exit(1);
  });
});



