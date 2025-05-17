const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String },
  agency: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    district: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  privacy: { type: String, enum: ['public', 'private'], default: 'private' },
  status: { type: String, enum: ['submitted', 'assigned', 'resolved'], default: 'submitted' },
  response: { type: String },
  citizenContact: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);
