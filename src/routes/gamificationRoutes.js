const express = require('express');
const router = express.Router();
const {
  getChallenges,
  completeChallenge,
  createChallenge
} = require('../controllers/gamificationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/challenges')
    .get(protect, getChallenges)
    .post(protect, admin, createChallenge);

router.post('/complete', protect, completeChallenge);

module.exports = router;
