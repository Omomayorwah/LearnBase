const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lernbase');

    // Clear existing data
    await Course.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing data');

    // Create sample users
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@lernbase.ng',
      password: 'admin123',
      phone: '+2348012345678',
      role: 'admin',
      location: 'Lagos, Nigeria',
      isVerified: true
    });

    const teacherUser = await User.create({
      name: 'Emeka Okafor',
      email: 'teacher@lernbase.ng',
      password: 'teacher123',
      phone: '+2348023456789',
      role: 'teacher',
      location: 'Abuja, Nigeria',
      isVerified: true
    });

    console.log('Created sample users');

    // Create sample courses
    const courses = [
      {
        title: 'Basic Welding Skills',
        description: 'Learn fundamental welding techniques including arc welding, MIG, and TIG welding. Perfect for beginners in the trade.',
        category: 'Trade Skills',
        level: 'Beginner',
        duration: '6 weeks',
        language: 'en',
        modules: [
          {
            title: 'Introduction to Welding',
            description: 'Understanding welding basics and safety',
            order: 1,
            duration: '1 week'
          },
          {
            title: 'Arc Welding Techniques',
            description: 'Master arc welding fundamentals',
            order: 2,
            duration: '2 weeks'
          },
          {
            title: 'MIG and TIG Welding',
            description: 'Advanced welding methods',
            order: 3,
            duration: '2 weeks'
          },
          {
            title: 'Final Project',
            description: 'Complete a welding project',
            order: 4,
            duration: '1 week'
          }
        ],
        certification: {
          available: true,
          issuer: 'NABTEB',
          passingScore: 70
        },
        rating: 4.5,
        isOfflineAvailable: true,
        createdBy: teacherUser._id
      },
      {
        title: 'Phone Repair and Maintenance',
        description: 'Comprehensive phone repair course covering hardware and software troubleshooting for smartphones.',
        category: 'Tech Skills',
        level: 'Beginner',
        duration: '4 weeks',
        language: 'en',
        modules: [
          {
            title: 'Phone Hardware Basics',
            description: 'Understanding phone components',
            order: 1,
            duration: '1 week'
          },
          {
            title: 'Common Hardware Repairs',
            description: 'Screen replacement, battery issues',
            order: 2,
            duration: '1 week'
          },
          {
            title: 'Software Troubleshooting',
            description: 'OS issues and flashing',
            order: 3,
            duration: '1 week'
          },
          {
            title: 'Business Setup',
            description: 'Starting your repair business',
            order: 4,
            duration: '1 week'
          }
        ],
        certification: {
          available: true,
          issuer: 'ITF',
          passingScore: 75
        },
        rating: 4.7,
        isOfflineAvailable: true,
        createdBy: teacherUser._id
      },
      {
        title: 'Fashion Design Fundamentals',
        description: 'Learn basic fashion design, pattern making, and garment construction. Includes traditional and modern Nigerian styles.',
        category: 'Creative Skills',
        level: 'Beginner',
        duration: '8 weeks',
        language: 'en',
        modules: [
          {
            title: 'Introduction to Fashion Design',
            description: 'Fashion basics and terminology',
            order: 1,
            duration: '1 week'
          },
          {
            title: 'Taking Measurements',
            description: 'Accurate body measurements',
            order: 2,
            duration: '1 week'
          },
          {
            title: 'Pattern Making',
            description: 'Creating basic patterns',
            order: 3,
            duration: '2 weeks'
          },
          {
            title: 'Sewing Techniques',
            description: 'Hand and machine sewing',
            order: 4,
            duration: '2 weeks'
          },
          {
            title: 'Nigerian Traditional Attire',
            description: 'Agbada, Ankara styles',
            order: 5,
            duration: '1 week'
          },
          {
            title: 'Final Collection',
            description: 'Create your mini collection',
            order: 6,
            duration: '1 week'
          }
        ],
        certification: {
          available: true,
          issuer: 'LernBase',
          passingScore: 70
        },
        rating: 4.6,
        isOfflineAvailable: false,
        createdBy: teacherUser._id
      },
      {
        title: 'Auto Mechanics - Engine Repair',
        description: 'Advanced course on vehicle engine diagnosis, repair, and maintenance. Covers both petrol and diesel engines.',
        category: 'Trade Skills',
        level: 'Advanced',
        duration: '12 weeks',
        language: 'en',
        modules: [
          {
            title: 'Engine Systems Overview',
            description: 'Understanding engine components',
            order: 1,
            duration: '2 weeks'
          },
          {
            title: 'Diagnosis and Troubleshooting',
            description: 'Identifying engine problems',
            order: 2,
            duration: '3 weeks'
          },
          {
            title: 'Engine Disassembly',
            description: 'Safe engine teardown procedures',
            order: 3,
            duration: '2 weeks'
          },
          {
            title: 'Repair and Replacement',
            description: 'Fixing common issues',
            order: 4,
            duration: '3 weeks'
          },
          {
            title: 'Engine Assembly and Testing',
            description: 'Putting it all back together',
            order: 5,
            duration: '2 weeks'
          }
        ],
        certification: {
          available: true,
          issuer: 'NABTEB',
          passingScore: 80
        },
        rating: 4.8,
        isOfflineAvailable: true,
        createdBy: teacherUser._id
      },
      {
        title: 'Hausa Language for Beginners',
        description: 'Learn basic Hausa language for communication in Northern Nigeria. Includes common phrases, greetings, and business vocabulary.',
        category: 'Business Skills',
        level: 'Beginner',
        duration: '6 weeks',
        language: 'ha',
        modules: [
          {
            title: 'Basic Greetings',
            description: 'Sannu, Yaya lafiya',
            order: 1,
            duration: '1 week'
          },
          {
            title: 'Numbers and Time',
            description: 'Counting and telling time',
            order: 2,
            duration: '1 week'
          },
          {
            title: 'Market Vocabulary',
            description: 'Shopping and bargaining',
            order: 3,
            duration: '2 weeks'
          },
          {
            title: 'Business Communication',
            description: 'Professional Hausa',
            order: 4,
            duration: '2 weeks'
          }
        ],
        certification: {
          available: true,
          issuer: 'LernBase',
          passingScore: 60
        },
        rating: 4.3,
        isOfflineAvailable: true,
        createdBy: teacherUser._id
      },
      {
        title: 'Digital Marketing for Small Business',
        description: 'Learn how to market your business online using social media, WhatsApp Business, and Google My Business.',
        category: 'Business Skills',
        level: 'Intermediate',
        duration: '5 weeks',
        language: 'en',
        modules: [
          {
            title: 'Social Media Marketing Basics',
            description: 'Facebook, Instagram, Twitter',
            order: 1,
            duration: '1 week'
          },
          {
            title: 'WhatsApp Business Mastery',
            description: 'Using WhatsApp for sales',
            order: 2,
            duration: '1 week'
          },
          {
            title: 'Content Creation',
            description: 'Photos, videos, captions',
            order: 3,
            duration: '1 week'
          },
          {
            title: 'Customer Engagement',
            description: 'Building customer relationships',
            order: 4,
            duration: '1 week'
          },
          {
            title: 'Analytics and Growth',
            description: 'Measuring success',
            order: 5,
            duration: '1 week'
          }
        ],
        certification: {
          available: true,
          issuer: 'LernBase',
          passingScore: 70
        },
        rating: 4.4,
        isOfflineAvailable: false,
        createdBy: teacherUser._id
      }
    ];

    await Course.insertMany(courses);
    console.log('Created sample courses');

    console.log('✅ Database seeded successfully!');
    console.log('\nSample Login Credentials:');
    console.log('Admin: admin@lernbase.ng / admin123');
    console.log('Teacher: teacher@lernbase.ng / teacher123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

