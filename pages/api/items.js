import { MongoClient, ObjectId } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://imostafa:uIYmepEbhbeHEqz7@cluster0.ewriadj.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  return { client, db };
}

export default async function handler(req, res) {
  try {
    const { client, db } = await connectToDatabase();
    //handle post requests and its errors
    if (req.method === "POST") {
      const item = req.body;
      const listsCollection = db.collection("list");
      // Push to "items" array of the specified list
      await listsCollection.updateOne(
        { _id: new ObjectId(item.listId) },
        { $push: { items: item } }
      );
      client.close();
      res.status(200).json({ message: "Item added successfully" });
      //handle delete requests and its errors
    } else if (req.method === "DELETE") {
      const id = req.body;
      const listsCollection = db.collection("list");
      const filter = {
        _id: new ObjectId(id.listId),
      };

      const update = {
        $pull: { items: { id: id.itemId } },
      };

      const result = await listsCollection.updateOne(filter, update);

      if (result.matchedCount === 0) {
        res.status(404).json({ message: "Item not found" });
      } else {
        res.status(200).json({ message: "Item deleted successfully" });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
