const express = require('express');
const Complaint = require('../models/Complaint');
const router = express.Router();

// Hardcoded category → agency mapping
const categoryAgencyMap = {
  'Potholes': 'MININFRA',
  'Bribery': 'Ombudsman',
  // Add more mappings as needed
};

// POST /api/complaints - Submit a new complaint
router.post('/', async (req, res) => {
  try {
    const { category, subcategory, description, location, privacy, citizenContact } = req.body;
    const agency = categoryAgencyMap[category] || 'Other';
    const complaint = new Complaint({
      category,
      subcategory,
      agency,
      description,
      location,
      privacy,
      citizenContact,
      status: 'submitted',
    });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/complaints/:id - Get complaint by ID
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ error: 'Not found' });
    res.json(complaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/complaints - List all complaints (admin)
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/complaints/:id - Update complaint status/response (admin)
router.patch('/:id', async (req, res) => {
  try {
    const update = req.body;
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!complaint) return res.status(404).json({ error: 'Not found' });
    res.json(complaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
