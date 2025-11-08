const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  title: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    required: true,
    enum: ['NABTEB', 'ITF', 'TRCN', 'LernBase', 'Custom']
  },
  verificationCode: {
    type: String,
    unique: true,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: Date,
  status: {
    type: String,
    enum: ['valid', 'expired', 'revoked'],
    default: 'valid'
  },
  certificateUrl: String,
  skills: [String],
  score: Number
}, {
  timestamps: true
});

// Generate verification code before saving
certificateSchema.pre('save', function(next) {
  if (!this.verificationCode) {
    this.verificationCode = `${this.issuer}-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model('Certificate', certificateSchema);

