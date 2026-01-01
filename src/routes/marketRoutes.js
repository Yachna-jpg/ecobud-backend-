const express = require('express');
const router = express.Router();
const {
  getItems,
  redeemItem,
  createItem
} = require('../controllers/marketplaceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getItems)
    .post(protect, admin, createItem);

router.post('/redeem', protect, redeemItem);

module.exports = router;
