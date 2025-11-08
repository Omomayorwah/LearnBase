const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    match: [/^\+?[0-9]{10,14}$/, 'Please enter a valid phone number']
  },
  role: {
    type: String,
    enum: ['student', 'artisan', 'employer', 'teacher', 'admin'],
    default: 'student'
  },
  location: {
    type: String,
    default: 'Nigeria'
  },
  language: {
    type: String,
    enum: ['en', 'ha', 'yo', 'ig', 'pidgin'],
    default: 'en'
  },
  bio: String,
  avatar: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  bvn: String,
  nin: String,
  enrolledCourses: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    progress: { type: Number, default: 0 },
    enrolledAt: { type: Date, default: Date.now }
  }],
  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  }],
  jobApplications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

