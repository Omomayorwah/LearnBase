const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { authMiddleware } = require('../middleware/auth');

// Get all courses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { category, level, language } = req.query;
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (language) filter.language = language;

    const courses = await Course.find(filter)
      .select('-modules')
      .sort('-createdAt');

    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get course by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Enroll in course
router.post('/:id/enroll', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    const User = require('../models/User');
    const user = await User.findById(req.user.userId);

    // Check if already enrolled
    const alreadyEnrolled = user.enrolledCourses.some(
      ec => ec.courseId.toString() === course._id.toString()
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ 
        success: false, 
        message: 'Already enrolled in this course' 
      });
    }

    user.enrolledCourses.push({
      courseId: course._id,
      progress: 0
    });

    course.enrolled += 1;

    await Promise.all([user.save(), course.save()]);

    res.json({
      success: true,
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;

