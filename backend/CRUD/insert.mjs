import { client } from "../config/mongoClient.mjs";

async function insertOne() {
  //Single document to insert
  //Run query and output result
  const database = client.db("test");
  const collection = database.collection("Students");
  const newStudent = {
    Name: "Victoria  Nirca",
    Email: "VictoriaNirca@icloud.com",
    StudentID: "M00654123",
  };
  await collection.insertOne(newStudent);
}

export default insertOne;
