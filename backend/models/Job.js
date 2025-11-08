const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  companyLogo: String,
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  location: {
    state: { type: String, required: true },
    city: String,
    address: String
  },
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'NGN' }
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Gig'],
    default: 'Full-time'
  },
  category: {
    type: String,
    enum: ['Trade Skills', 'Tech Skills', 'Creative Skills', 'Business Skills'],
    required: true
  },
  requiredCertificates: [{
    issuer: String,
    title: String
  }],
  skillsRequired: [String],
  applications: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appliedAt: { type: Date, default: Date.now },
    status: { 
      type: String, 
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
      default: 'pending'
    }
  }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);

