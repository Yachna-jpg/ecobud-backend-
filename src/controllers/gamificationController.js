const Challenge = require('../models/Challenge');
const User = require('../models/user');

// @desc    Get active challenges
// @route   GET /api/gamification/challenges
// @access  Private
const getChallenges = async (req, res) => {
  const challenges = await Challenge.find({});
  res.json(challenges);
};

// @desc    Complete a challenge
// @route   POST /api/gamification/complete
// @access  Private
const completeChallenge = async (req, res) => {
  const { challengeId } = req.body;
  const user = await User.findById(req.user._id);
  const challenge = await Challenge.findById(challengeId);

  if (user && challenge) {
    // Check if already completed if tracking (simplified for now)
    user.points += challenge.rewardPoints;
    await user.save();
    res.json({ message: `Challenge completed! +${challenge.rewardPoints} points`, totalPoints: user.points });
  } else {
    res.status(404).json({ message: 'User or Challenge not found' });
  }
};

// @desc    Create challenge (Admin)
// @route   POST /api/gamification/challenges
// @access  Private/Admin
const createChallenge = async (req, res) => {
    const { title, description, rewardPoints, type, expiryDate } = req.body;
    const challenge = await Challenge.create({ title, description, rewardPoints, type, expiryDate });
    res.status(201).json(challenge);
}

module.exports = {
  getChallenges,
  completeChallenge,
  createChallenge
};
