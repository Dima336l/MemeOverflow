import express from "express";
import bodyParser from "body-parser";
import { db } from "./backend/config/mongoClient.mjs";
import session from "express-session";
import fileUpload from "express-fileupload";

const usersCollection = db.collection("users");
const memeCollection = db.collection("memes");

const app = express();
app.use(fileUpload());

app.use(bodyParser.json());

app.use(
  session({
    secret: "cst2120 secret",
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("frontend/public"));

const port = 3000;

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});

// Register a user.
app.post("/M00888146/Register", async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    const existingUser = await usersCollection.findOne({ userEmail });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists." });
    }
    const userDocument = {
      userEmail: userEmail,
      userName: userName,
      userPassword: userPassword,
      avatar: "avatar.png",
      posts: [],
      followers: [],
    };
    await usersCollection.insertOne(userDocument);
    req.session.username = userEmail;
    res.json({ success: true, message: "User registered successfully." });
  } catch (error) {}
});

app.post("/M00888146/Login", async (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  try {
    const userDocument = await usersCollection.findOne({
      userEmail,
      userPassword,
    });
    if (userDocument) {
      req.session.username = userEmail;
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Email or password is incorrect." });
    }
  } catch (error) {
    next(error);
  }
});

app.post("/M00888146/uploads", async (request, response) => {
  try {
    const session = request.session;
    // Check if a file has been submitted
    if (!request.files || Object.keys(request.files).length === 0) {
      return response.status(400).send({
        success: false,
        message: "Files missing",
      });
    }

    // Retrieve the uploaded file
    let myFile = request.files.myFile;

    // Check if the uploaded file is an image (implement this check)

    // Move the file to the uploads folder
    myFile.mv("./frontend/public/uploads/" + myFile.name, async function (err) {
      if (err) {
        console.error("Error moving file:", err);
        return response.status(500).send({
          success: false,
          message: "Failed to move file",
        });
      }

      const { title, category } = request.body;
      const userDocument = await usersCollection.findOne({
        userEmail: session.username,
      });
      if (!userDocument) {
        return response.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      if (title === undefined) {
        await usersCollection.updateOne(
          { userEmail: session.username },
          { $set: { avatar: myFile.name } }
        );
      } else {
        userDocument.posts.push(myFile.name);
        await usersCollection.updateOne(
          { userEmail: session.username },
          { $set: { posts: userDocument.posts } }
        );
        const name = userDocument.userName;
        const currentDate = new Date();
        const options = {
          timeZone: "Europe/London",
          day: "2-digit",
          month: "short",
        };
        const formattedDate = currentDate.toLocaleString("en-GB", options);
        const likeCount = 0;
        const commentCount = 0;
        const viewCount = 0;
        await memeCollection.insertOne({
          fileName: myFile.name,
          name,
          title,
          category,
          uploadDate: formattedDate,
          likeCount,
          commentCount,
          viewCount,
          avatar: userDocument.avatar,
        });
      }

      response.send({
        success: true,
        message: "Image data saved successfully",
      });
    });
  } catch (error) {
    console.error("Error handling image upload:", error);
    response.status(500).send("Internal server error");
  }
});

app.get("/M00888146/uploads", async (req, res) => {
  try {
    // Fetch meme data from MongoDB collection
    const memes = await memeCollection.find().toArray();
    // Send meme data as JSON response
    res.json(memes);
  } catch (error) {
    console.error("Error fetching meme data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/M00888146/followUser", async (req, res) => {
  const { userName } = req.body;
  try {
    const userDocument = await usersCollection.findOne({
      userEmail: req.session.username,
    });
    userDocument.followers.push(userName);
    await usersCollection.updateOne(
      { userEmail: req.session.username },
      { $set: { followers: userDocument.followers } }
    );
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

app.get("/M00888146/getFeedFromFollowers", async (req, res) => {
  try {
    const userDocument = await usersCollection.findOne({
      userEmail: req.session.username,
    });
    let memesFromFollowers = [];
    const followers = userDocument.followers;

    const memes = await memeCollection.find().toArray();
    for (let i = 0; i < followers.length; i++) {
      for (let j = 0; j < memes.length; j++) {
        if (followers[i] === memes[j].name) {
          memesFromFollowers.push(memes[j]);
        }
      }
    }
    res.json({ memes: memesFromFollowers });
  } catch (error) {
    res.json({ memes: undefined });
  }
});

app.post("/M00888146/getFeed", async (req, res) => {
  const { name } = req.body; // Extract username from request body
  let isFollowed = false;
  if ("username" in req.session) {
    const loggedInUserDocument = await usersCollection.findOne({
      userEmail: req.session.username,
    });
    const followers = await loggedInUserDocument.followers;
    for (let i = 0; i < followers.length; i++) {
      if (followers[i] === name) {
        isFollowed = true;
        break;
      }
    }
  }
  const userDocument = await usersCollection.findOne({
    userName: name,
  });

  const memes = await memeCollection.find({ name: name }).toArray();
  const filteredMemes = memes.filter((meme) => meme.title != null);
  if (userDocument) {
    // Construct the response object including filtered memes and user's avatar
    const responseData = {
      memes: filteredMemes,
      avatar: userDocument.avatar,
      isFollowed: isFollowed,
    };

    // Send the response containing both filtered memes and avatar
    res.json(responseData);
  } else {
    // Handle case where user document is not found
    res.json({ error: "User not found" });
  }
});

app.get("/M00888146/Register", async (req, res, next) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

app.get("/M00888146/getFeedByCategory", async (req, res, next) => {
  const { category } = req.query;
  const memes = await memeCollection.find().toArray();
  const filteredMemes = memes.filter((meme) => meme.category === category);
  res.json(filteredMemes);
});

async function checkLogin(req, response) {
  try {
    const session = req.session;

    if (!("username" in req.session)) {
      response.send('{"login": false}');
    } else {
      const userDocument = await usersCollection.findOne({
        userEmail: session.username,
      });
      if (userDocument && userDocument.avatar != "") {
        response.send({
          login: true,
          username: session.username,
          avatar: userDocument.avatar,
        });
      } else {
        response.send({
          login: true,
          username: session.username,
          avatar: "avatar.png",
        });
      }
    }
  } catch (error) {
    console.error("Error checking login:", error);
    response.status(500).send('{"error": "Internal server error"}');
  }
}

app.post("/M00888146/logout", (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy((err) => {
    if (err) {
      // If an error occurs while destroying the session
      res.status(500).json({ error: "Failed to log out", details: err });
    } else {
      // If the session is successfully destroyed
      res.json({ success: true, message: "Logged out successfully" });
    }
  });
});

app.get("/M00888146/checkLogin", checkLogin);

// Error handling middleware to catch any unhandled errors
app.use((err, req, res, next) => {
  console.error("Error:", err); // Log the error
  res.status(500).json({ error: "Internal Server Error" }); // Send a generic error response
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
