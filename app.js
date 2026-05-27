const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");

app.use(express.json());

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "giftsDB";

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Gifts API");
});

//  Register route
app.post("/api/auth/register", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection("users");

    const newUser = { username: req.body.username, password: req.body.password };
    await users.insertOne(newUser);

    res.json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Login route
app.post("/api/auth/login", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection("users");

    const { username, password } = req.body;
    const user = await users.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Add a new gift
app.post("/api/gifts", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const gifts = db.collection("gifts");

    const newGift = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    };

    await gifts.insertOne(newGift);
    res.json({ message: "Gift added successfully", gift: newGift });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  List all gifts
app.get("/api/gifts", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const gifts = db.collection("gifts");

    const allGifts = await gifts.find({}).toArray();
    res.json(allGifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Gift detail
app.get("/api/gifts/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const gifts = db.collection("gifts");

    const giftId = req.params.id;
    const gift = await gifts.findOne({ _id: new ObjectId(giftId) });

    if (!gift) {
      return res.status(404).json({ message: "Gift not found" });
    }

    res.json(gift);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Search gifts
app.get("/api/search", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const gifts = db.collection("gifts");

    const query = req.query.q;
    const results = await gifts.find({ name: { $regex: query, $options: "i" } }).toArray();

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

(async () => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const gifts = db.collection("gifts");

    const sampleData = [
      { name: "Book", category: "education", price: 15 },
      { name: "Watch", category: "fashion", price: 200 },
      { name: "Laptop", category: "electronics", price: 1000 },
      { name: "Bag", category: "fashion", price: 60 },
      { name: "Tablet", category: "electronics", price: 400 },
      { name: "Shoes", category: "fashion", price: 80 },
      { name: "Camera", category: "electronics", price: 350 },
      { name: "Sunglasses", category: "fashion", price: 40 },
      { name: "Necklace", category: "fashion", price: 150 },
      { name: "Headphones", category: "electronics", price: 120 },
      { name: "Ring", category: "fashion", price: 90 },
      { name: "Bracelet", category: "fashion", price: 70 },
      { name: "Phone", category: "electronics", price: 700 },
      { name: "Wallet", category: "fashion", price: 30 },
      { name: "Toy Car", category: "toys", price: 10 },
      { name: "Perfume", category: "fashion", price: 50 }
    ];

    await gifts.deleteMany({});
    const result = await gifts.insertMany(sampleData);
    console.log(`inserted_items: ${result.insertedCount} documents successfully inserted`);
  } catch (err) {
    console.error(err);
  }
})();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
