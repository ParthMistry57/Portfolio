const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  referrer: { type: String, default: '' },
  sessionId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  country: { type: String, default: 'Unknown' },
  city: { type: String, default: 'Unknown' }
});

module.exports = mongoose.model('Visitor', visitorSchema);