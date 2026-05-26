const express = require("express");
const router = express.Router();
const client = require("./db"); // import client from db.js

async function connectToDatabase() {
  await client.connect();
  const db = client.db("giftsDB");
  return db.collection("gifts");
}

// GET search results filtered by category
router.get("/api/search", async (req, res) => {
  try {
    const category = req.query.category; // e.g. ?category=toys
    const collection = await connectToDatabase();

    let query = {};
    if (category) {
      query = { category: category };
    }

    const results = await collection.find(query).toArray();
    res.json(results);
  } catch (err) {
    res.status(500).send("Error searching gifts");
  }
});

module.exports = router;
