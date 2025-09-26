const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import models
const Visitor = require('./models/Visitor');
const PageView = require('./models/PageView');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_analytics')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Portfolio Backend'
  });
});

// Analytics Routes - Simple Visitor Counter
app.post('/api/analytics/track', async (req, res) => {
  try {
    const { sessionId } = req.body;
    const ip = req.ip || req.connection.remoteAddress;

    console.log('Analytics request received:', { sessionId, ip });

    // Check if this visitor already exists
    let visitor = await Visitor.findOne({ sessionId });
    
    if (!visitor) {
      console.log('New visitor detected, creating...');
      // New visitor - create and count
      visitor = new Visitor({
        ip,
        userAgent: req.get('User-Agent'),
        referrer: req.get('Referer') || '',
        sessionId
      });
      await visitor.save();
      console.log('New visitor saved:', visitor._id);
    } else {
      console.log('Existing visitor found:', visitor._id);
    }

    const totalVisitors = await Visitor.countDocuments();
    console.log('Total visitors:', totalVisitors);

    res.json({ 
      success: true, 
      isNewVisitor: !visitor,
      totalVisitors
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({ error: 'Failed to track analytics' });
  }
});

app.get('/api/analytics/dashboard', async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    
    const recentVisitors = await Visitor.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .select('ip timestamp');

    res.json({
      totalVisitors,
      recentVisitors
    });
  } catch (error) {
    console.error('Analytics dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Clear all analytics data
app.delete('/api/analytics/clear', async (req, res) => {
  try {
    // Delete all visitors and page views
    await Visitor.deleteMany({});
    await PageView.deleteMany({});
    
    console.log('All analytics data cleared');
    res.json({ 
      success: true, 
      message: 'All analytics data cleared successfully' 
    });
  } catch (error) {
    console.error('Clear analytics error:', error);
    res.status(500).json({ error: 'Failed to clear analytics data' });
  }
});

// To start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});