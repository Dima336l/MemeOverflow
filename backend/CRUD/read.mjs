import { coll } from "../config/mongoClient.mjs";

async function getUsers() {
    const cursor = coll.find();
    const cursorArr = await cursor.toArray();
    return cursorArr;
}

export default getUsers;