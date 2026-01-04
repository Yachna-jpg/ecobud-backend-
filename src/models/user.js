const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['citizen', 'admin'],
      default: 'citizen',
    },
    points: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        type: String,
      },
    ],
    completedTraining: {
      type: Boolean,
      default: false,
    },

    // 👇 VIDEO WATCH TRACKING (ADDED)
    video1Watched: {
      type: Boolean,
      default: false,
    },
    video2Watched: {
      type: Boolean,
      default: false,
    },
    video3Watched: {
      type: Boolean,
      default: false,
    },
    video4Watched: {
      type: Boolean,
      default: false,
    },
    video5Watched: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔐 Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
