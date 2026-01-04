const User = require('../models/user');

// @desc    Auth user with Firebase Token (Login/Register Sync)
// @route   POST /api/auth/google-login
// @access  Protected (by Firebase Middleware)
const googleLogin = async (req, res) => {
    // Middleware has already verified the token and attached req.user
    // We just return the user profile and our own JWT if we wanted (or just use Firebase token)
    // Here we just acknowledge the login and return profile data
    
    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        points: req.user.points,
        badges: req.user.badges,
        message: "Login successful",
  token,
  user: {
    id: user._id,
    email: user.email}

    });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      points: user.points,
      badges: user.badges,
      completedTraining: user.completedTraining,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  googleLogin,
  getUserProfile,
};
