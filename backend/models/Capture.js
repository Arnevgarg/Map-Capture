const mongoose = require('mongoose');

const captureSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
    index: true,
  },
  longitude: {
    type: Number,
    required: true,
    index: true,
  },
  zoom: {
    type: Number,
    required: true
  },
  mapImage: {
    type: String, // Store the image as a base64 string
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Capture = mongoose.model('Capture', captureSchema);

module.exports = { Capture };
