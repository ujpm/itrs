const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'pending_agency', 'admin', 'superadmin'], default: 'citizen' },
  agency: { type: String }, // Only for government agency applicants
  isAgency: { type: Boolean, default: false },
  approved: { type: Boolean, default: false }, // For agency approval
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);
