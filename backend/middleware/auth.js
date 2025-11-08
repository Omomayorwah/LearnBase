const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No authentication token provided' 
      });
    }

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'lernbase-secret-key'
    );

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid authentication token' 
    });
  }
};


