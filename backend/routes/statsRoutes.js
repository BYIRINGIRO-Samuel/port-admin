const express = require('express');
const Project = require('../models/Project');
const Review = require('../models/Review');
const Career = require('../models/Career');
const Message = require('../models/Message');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const reviewCount = await Review.countDocuments();
    const careerCount = await Career.countDocuments();
    const unreadMessagesCount = await Message.countDocuments({ read: false });

    res.json({
      projects: projectCount,
      reviews: reviewCount,
      career: careerCount,
      messages: unreadMessagesCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
