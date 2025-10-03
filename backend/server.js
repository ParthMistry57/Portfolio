const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Import models
const Visitor = require('./models/Visitor');
const PageView = require('./models/PageView');
const Project = require('./models/Project');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Secure authentication middleware using database
const authenticateUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(401).json({ error: 'Username and password required' });
    }

    // Find user in database
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password with hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Authentication successful
    req.authenticated = true;
    req.user = { username: user.username, role: user.role };
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

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

// Authentication Routes
app.post('/api/auth/login', authenticateUser, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Login successful',
    user: { 
      username: req.user.username,
      role: req.user.role 
    }
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

app.post('/api/analytics/dashboard', authenticateUser, async (req, res) => {
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
app.delete('/api/analytics/clear', authenticateUser, async (req, res) => {
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

// Project Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Projects fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', authenticateUser, async (req, res) => {
  try {
    const { name, company, date, description, technologies, githubUrl, liveUrl } = req.body;
    
    const project = new Project({
      name,
      company,
      date,
      description,
      technologies: technologies || [],
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      order: await Project.countDocuments()
    });
    
    await project.save();
    res.json({ success: true, project });
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company, date, description, technologies, githubUrl, liveUrl } = req.body;
    
    const project = await Project.findByIdAndUpdate(
      id,
      {
        name,
        company,
        date,
        description,
        technologies: technologies || [],
        githubUrl: githubUrl || '',
        liveUrl: liveUrl || '',
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ success: true, project });
  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Project deletion error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// To start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});