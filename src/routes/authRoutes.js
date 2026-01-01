const express = require('express');
const router = express.Router();
const {
  googleLogin,
  getUserProfile,
} = require('../controllers/authcontroller');
const { protect } = require('../middleware/authMiddleware');

// The frontend sends the Firebase ID Token in the Authorization header
// The 'protect' middleware verifies it and creates/finds the user
router.post('/google-login', protect, googleLogin);
router.get('/profile', protect, getUserProfile);

module.exports = router;
