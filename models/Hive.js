const mongoose = require('mongoose');

const hiveSchema = new mongoose.Schema({
  hiveId: { type: String, unique: true },
  datePlaced: Date,
  latitude: Number,
  longitude: Number,
  numColonies: Number
}, { timestamps: true });

module.exports = mongoose.model('Hive', hiveSchema);
