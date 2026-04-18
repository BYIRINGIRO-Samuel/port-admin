const express = require('express');
const Career = require('../models/Career');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const entries = await Career.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newEntry = new Career(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.json({ message: 'Career entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCareer = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCareer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
