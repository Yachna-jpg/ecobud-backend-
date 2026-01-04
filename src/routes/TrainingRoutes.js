const express = require("express");
const router = express.Router();

const { markVideoWatched } = require("../controllers/trainingController");
const { protect } = require("../middleware/authMiddleware");

router.post("/watch-video", protect, markVideoWatched);

module.exports = router;
