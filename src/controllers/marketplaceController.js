const MarketItem = require('../models/MarketItem');
const User = require('../models/user');

// @desc    Get all market items
// @route   GET /api/market
// @access  Private
const getItems = async (req, res) => {
  const items = await MarketItem.find({});
  res.json(items);
};

// @desc    Redeem an item
// @route   POST /api/market/redeem
// @access  Private
const redeemItem = async (req, res) => {
  const { itemId } = req.body;
  const user = await User.findById(req.user._id);
  const item = await MarketItem.findById(itemId);

  if (item && user) {
    if (user.points >= item.cost) {
      if (item.stock > 0) {
        user.points -= item.cost;
        item.stock -= 1;
        await user.save();
        await item.save();
        res.json({ message: `Redeemed ${item.name}`, remainingPoints: user.points });
      } else {
        res.status(400).json({ message: 'Item out of stock' });
      }
    } else {
      res.status(400).json({ message: 'Not enough points' });
    }
  } else {
    res.status(404).json({ message: 'User or Item not found' });
  }
};

// @desc    Create market item (Seeder/Admin)
// @route   POST /api/market
// @access  Private/Admin
const createItem = async (req, res) => {
    const { name, description, cost, image, stock } = req.body;
    const item = await MarketItem.create({ name, description, cost, image, stock });
    res.status(201).json(item);
}


module.exports = {
  getItems,
  redeemItem,
  createItem
};
