const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// Get all pending agency users
router.get('/pending', auth, admin, async (req, res) => {
  try {
    const pending = await User.find({ role: 'pending_agency' });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending users' });
  }
});

// Approve agency user
router.post('/:id/approve', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'pending_agency') return res.status(404).json({ error: 'User not found or not pending' });
    user.role = 'admin';
    user.approved = true;
    await user.save();
    res.json({ message: 'User approved as admin' });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
});

module.exports = router;
