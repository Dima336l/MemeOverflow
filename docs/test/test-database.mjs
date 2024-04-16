import { db } from "../backend/config/mongoClient.mjs";
import { addUser } from "../server.mjs";
import { addMeme } from "../server.mjs";
import { followUser } from "../server.mjs";
import { removeFollowerFromUser } from "../server.mjs";
import { getUserByName } from "../server.mjs";
const usersCollection = db.collection("users");
const memeCollection = db.collection("memes");
import { should } from "chai"; // Using Assert, Expect, and Should styles
import { expect } from "chai";
should();
describe("Database Testing", () => {
  //Test getAllUsers method in database
  describe("#getAllUsers", () => {
    it("should return all of the users in the database", async () => {
      const results = await usersCollection.find().toArray();

      //Array should be returned
      results.should.be.a("array");

      //Check that appropriate user properties are returned
      if (results.length > 1) {
        results[0].should.have.property("userEmail");
        results[0].should.have.property("userName");
      }
    });
  });
});

//Test addUser method in database
describe("#addUser", () => {
  it("should add a user to the database", async () => {
    //Create random user details
    const userName = Math.random().toString(36).substring(2, 15);
    const userAge = 1;

    //Call function to add user to database
    let result = await addUser({ userName: userName, age: userAge });

    expect(result).to.equal(1);

    //Use MongoDB Client to check user is in database
    result = await usersCollection.find({ userName: userName }).toArray();
    expect(result.length).to.equal(1);

    //Clean up database
    result = await usersCollection.deleteOne({ userName: userName });
    expect(result.deletedCount).to.equal(1);
  });
});

describe("#postMeme", () => {
  it("Should post a meme to the database", async () => {
    //Create random user details
    const title = "C++ vs Python xd";
    const category = "C++";

    //Call function to add user to database
    let result = await addMeme({ title: title, category: category });

    expect(result).to.equal(1);

    //Use MongoDB Client to check user is in database
    result = await memeCollection.find({ title: title }).toArray();
    expect(result.length).to.equal(1);

    //Clean up database
    result = await memeCollection.deleteOne({ title: title });
    expect(result.deletedCount).to.equal(1);
  });
});

describe("#followUser", () => {
  it("Should update the followers array in the database", async () => {
    //Create random user details
    const name = "Dumitru";
    const followerName = "Andrei";
    const jsonObj = {userName: name, followerName: followerName};
    //Call function to add user to database
    let result = await followUser(jsonObj);
    expect(result).to.equal(1);
    await removeFollowerFromUser(jsonObj);
    const userDocument = await getUserByName(name);
    expect(userDocument.followers).to.not.include(followerName);
  });
});
