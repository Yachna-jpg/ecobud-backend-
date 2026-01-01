const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rewardPoints: {
    type: Number,
    required: true,
  },
  type: {
    type: String, // e.g., 'Weekly', 'Daily', 'Special'
    default: 'Weekly',
  },
  expiryDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
