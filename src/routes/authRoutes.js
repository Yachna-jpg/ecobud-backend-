const express = require('express');
const router = express.Router();

const {
  googleLogin,
  getUserProfile,
} = require('../controllers/authcontroller');

const { protect } = require('../middleware/authMiddleware');

// 🔹 Auth routes
// Frontend sends Firebase ID Token in Authorization header
router.post('/google-login', protect, googleLogin);
router.get('/profile', protect, getUserProfile);

module.exports = router;

