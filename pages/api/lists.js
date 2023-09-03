// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient, ObjectId } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://imostafa:uIYmepEbhbeHEqz7@cluster0.ewriadj.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  return { client, db };
}

export default async function listHandler(req, res) {
  try {
    const { client, db } = await connectToDatabase();
    if (req.method === "POST") {
      const list = req.body;
      const listsCollection = db.collection("list");
      const results = await listsCollection.insertOne(list);
      client.close();
      res
        .status(201)
        .json({ message: "Item added successfully", data: results });
      //handle the DELETE request
    } else if (req.method === "DELETE") {
      const id = req.body;
      const listsCollection = db.collection("list");
      const results = await listsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      client.close();
      if (results.deletedCount === 1) {
        res.status(200).json({ message: "Item deleted successfully" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
