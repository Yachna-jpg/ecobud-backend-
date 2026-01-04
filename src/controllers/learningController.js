const User = require("../models/user");

const markVideoWatched = async (req, res) => {
  try {
    const userId = req.user?.id; // Optional chaining for safety
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const { videoNumber } = req.body;

    // Validate videoNumber: Must be an integer between 1 and 5
    if (!Number.isInteger(videoNumber) || videoNumber < 1 || videoNumber > 5) {
      return res.status(400).json({ message: "Invalid video number. Must be an integer between 1 and 5." });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Dynamic field mapping (avoids hardcoding ifs)
    const fieldName = `video${videoNumber}Watched`;
    if (user[fieldName] === true) {
      return res.status(200).json({ message: "Video already marked as watched" });
    }

    // Update the specific field
    const updateField = { [fieldName]: true };
    await User.findByIdAndUpdate(userId, updateField);

    res.status(200).json({
      message: `Video ${videoNumber} marked as watched`,
    });
  } catch (error) {
    console.error("Error in markVideoWatched:", error); // Log for debugging
    res.status(500).json({
      message: "Internal server error while updating video progress",
    });
  }
};

module.exports = { markVideoWatched };
