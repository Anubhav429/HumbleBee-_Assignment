const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: String,
  floweringStart: Date,
  floweringEnd: Date,
  latitude: Number,
  longitude: Number,
  recommendedHiveDensity: Number
});

module.exports = mongoose.model('Crop', cropSchema);
