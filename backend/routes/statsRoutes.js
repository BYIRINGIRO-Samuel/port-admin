const express = require('express');
const Project = require('../models/Project');
const Review = require('../models/Review');
const Message = require('../models/Message');
const Visit = require('../models/Visit');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const reviewCount = await Review.countDocuments();
    const unreadMessagesCount = await Message.countDocuments({ read: false });

    // Get last 7 days of visits
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Aggregate visits by day
    const visits = await Visit.aggregate([
      { $match: { date: { $gte: sevenDaysAgo } } },
      { 
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          views: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format for frontend recharts
    const chartData = visits.map(v => ({
      name: v._id.slice(5), // Make it "MM-DD"
      views: v.views
    }));

    res.json({
      projects: projectCount,
      reviews: reviewCount,
      messages: unreadMessagesCount,
      visitsData: chartData.length > 0 ? chartData : [{ name: 'Today', views: 0 }]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/visit', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const newVisit = new Visit({ ip });
    await newVisit.save();
    res.status(201).json({ message: 'Visit recorded' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
