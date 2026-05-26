const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();   // ✅ Required line
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("Connection failed", err);
  }
}

connectDB();

module.exports = client;
