const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update or Create Services (Management)
router.post('/', async (req, res) => {
  const { title, description, icon, size, tags } = req.body;
  const service = new Service({ title, description, icon, size, tags });
  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
