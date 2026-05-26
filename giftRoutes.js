const express = require("express");
const router = express.Router();
const client = require("./db");  // import client from db.js

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("giftsDB");
    const collection = db.collection("gifts");
    return collection;
  } catch (err) {
    console.error("Database connection failed", err);
  }
}

// GET all gifts
router.get("/api/gifts", async (req, res) => {
  const collection = await connectToDatabase();
  const gifts = await collection.find({}).toArray();
  res.json(gifts);
});

// GET gift by ID
router.get("/api/gifts/:id", async (req, res) => {
  const collection = await connectToDatabase();
  const gift = await collection.findOne({ _id: req.params.id });
  if (gift) {
    res.json(gift);
  } else {
    res.status(404).send("Gift not found");
  }
});

module.exports = router;
