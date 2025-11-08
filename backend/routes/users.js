const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('enrolledCourses.courseId', 'title category')
      .populate('certificates');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, location, bio, language } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (bio) user.bio = bio;
    if (language) user.language = language;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get user progress
router.get('/progress', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('enrolledCourses.courseId', 'title category duration');

    const progress = user.enrolledCourses.map(ec => ({
      course: ec.courseId,
      progress: ec.progress,
      enrolledAt: ec.enrolledAt
    }));

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Update course progress
router.put('/progress/:courseId', authMiddleware, async (req, res) => {
  try {
    const { progress } = req.body;

    if (progress < 0 || progress > 100) {
      return res.status(400).json({ 
        success: false, 
        message: 'Progress must be between 0 and 100' 
      });
    }

    const user = await User.findById(req.user.userId);
    const courseEnrollment = user.enrolledCourses.find(
      ec => ec.courseId.toString() === req.params.courseId
    );

    if (!courseEnrollment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Not enrolled in this course' 
      });
    }

    courseEnrollment.progress = progress;
    await user.save();

    res.json({
      success: true,
      message: 'Progress updated successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;


