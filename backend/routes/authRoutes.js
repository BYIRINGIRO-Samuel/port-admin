const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_123';

router.post('/login', async (req, res) => {
  try {
    const { passcode } = req.body;
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: "Admin system not initialized" });
    }

    const isMatch = await bcrypt.compare(passcode, admin.passcode);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid auth sequence" });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, message: "Authentication successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Availability Status
router.get('/availability', async (req, res) => {
  try {
    const admin = await Admin.findOne();
    res.json({ isAvailable: admin ? admin.isAvailable : true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Availability Status
router.patch('/availability', async (req, res) => {
  try {
    const { isAvailable } = req.body;
    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.isAvailable = isAvailable;
    await admin.save();
    res.json({ isAvailable: admin.isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
