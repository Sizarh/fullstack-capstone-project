// authRoutes.js

const express = require("express");
const router = express.Router();
const client = require("./db"); // import client from db.js

async function connectToDatabase() {
  await client.connect();
  const db = client.db("giftsDB");
  return db.collection("users");
}

// Route to find current user
router.get("/api/currentUser", async (req, res) => {
  try {
    const username = req.query.username; // e.g. ?username=Zama
    const collection = await connectToDatabase();

    const user = await collection.findOne({ username: username }); // findOne method

    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send("Error locating user");
  }
});

module.exports = router;

