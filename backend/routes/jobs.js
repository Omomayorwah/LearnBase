const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { authMiddleware } = require('../middleware/auth');

// Get all jobs
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { category, type, location } = req.query;
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (location) filter['location.state'] = location;

    const jobs = await Job.find(filter)
      .populate('postedBy', 'name')
      .sort('-createdAt')
      .limit(50);

    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Apply for job
router.post('/:id/apply', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    // Check if already applied
    const alreadyApplied = job.applications.some(
      app => app.userId.toString() === req.user.userId
    );

    if (alreadyApplied) {
      return res.status(400).json({ 
        success: false, 
        message: 'Already applied to this job' 
      });
    }

    job.applications.push({
      userId: req.user.userId,
      status: 'pending'
    });

    await job.save();

    res.json({
      success: true,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;


