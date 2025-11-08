const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Trade Skills', 'Tech Skills', 'Creative Skills', 'Business Skills'],
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['en', 'ha', 'yo', 'ig', 'pidgin'],
    default: 'en'
  },
  thumbnail: String,
  modules: [{
    title: String,
    description: String,
    content: String,
    videoUrl: String,
    order: Number,
    duration: String
  }],
  certification: {
    available: { type: Boolean, default: true },
    issuer: String,
    passingScore: { type: Number, default: 70 }
  },
  enrolled: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isOfflineAvailable: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);

