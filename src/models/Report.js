const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  image: {
    type: String, // URL or path to image
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Collected', 'Escalated'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
