const mongoose = require('mongoose');

const marketItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cost: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const MarketItem = mongoose.model('MarketItem', marketItemSchema);

module.exports = MarketItem;
