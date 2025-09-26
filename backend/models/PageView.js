const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  page: { type: String, required: true },
  visitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor', required: true },
  timestamp: { type: Date, default: Date.now },
  duration: { type: Number, default: 0 },
  scrollDepth: { type: Number, default: 0 }
});

module.exports = mongoose.model('PageView', pageViewSchema);