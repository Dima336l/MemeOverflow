import express from "express";
import bodyParser from "body-parser";
import run from "./backend/config/database.mjs";
import User from "./backend/schemas/userSchema.mjs";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("frontend/public"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/M00888146", (req, res) => {
  res.send({
    Name: "Dumitru Nirca",
    Address: "Nircadmitrii@icloud.com",
    "Student ID": "M00888146"
  });
});

app.get("/M00888146/Register", (req, res) => {
  res.send("Welcome to the Registration Page!");
});

app.post("/M00888146/Register", async (req, res) => {
  try {
    // Extract data from the request body
    const { email, username, password } = req.body;

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: "Internal server error" });
  }
});

run();
