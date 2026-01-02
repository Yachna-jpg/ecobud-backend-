const express = require("express");
const app = express();
const { protect } = require("./src/middleware/authMiddleware");

app.use(express.json());

// Protected route example
app.get("/api/profile", protect, (req, res) => {
  // req.user is set by protect middleware
  res.json({ email: req.user.email, uid: req.user.uid });
});

app.listen(5000, () => console.log("Server running on port 5000"));