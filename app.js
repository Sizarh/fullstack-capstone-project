const express = require("express");
const app = express();

// Import routes
const giftRoutes = require("./giftRoutes");
const searchRoutes = require("./searchRoutes");

// Middleware
app.use(express.json());

// Use routes
app.use(giftRoutes);
app.use(searchRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Gifts API");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
