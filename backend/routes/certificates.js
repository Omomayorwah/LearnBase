const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const { authMiddleware } = require('../middleware/auth');

// Get user certificates
router.get('/', authMiddleware, async (req, res) => {
  try {
    const certificates = await Certificate.find({ 
      userId: req.user.userId 
    })
    .populate('courseId', 'title category')
    .sort('-issueDate');

    res.json({
      success: true,
      data: certificates
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Verify certificate
router.get('/verify/:code', async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ 
      verificationCode: req.params.code 
    })
    .populate('userId', 'name email')
    .populate('courseId', 'title');

    if (!certificate) {
      return res.status(404).json({ 
        success: false, 
        message: 'Certificate not found' 
      });
    }

    res.json({
      success: true,
      data: certificate
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;


