# LernBase Nigeria Backend

A comprehensive Node.js backend API for LernBase Nigeria - Skills for Success platform.

## Project Structure

```
backend/
├── config/
│   └── env.example          # Environment variables template
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── User.js              # User schema
│   ├── Course.js            # Course schema
│   ├── Certificate.js       # Certificate schema
│   └── Job.js               # Job schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── courses.js           # Course management routes
│   ├── certificates.js      # Certificate routes
│   ├── jobs.js              # Job portal routes
│   └── users.js             # User management routes
├── scripts/
│   └── seedData.js          # Database seeding script
├── utils/
│   ├── sms.js               # SMS/USSD utilities
│   └── email.js             # Email utilities
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
└── README.md                # Documentation
```

## Features

- **Authentication & Authorization**: JWT-based auth with role management
- **Course Management**: CRUD operations for courses and modules
- **Certificate System**: Digital certificate generation and verification
- **Job Portal**: Job posting and application management
- **User Management**: Profile management and progress tracking
- **Multi-language Support**: English, Hausa, Yoruba, Igbo, Pidgin
- **SMS/USSD Integration**: Offline access via USSD codes
- **Email Notifications**: Automated email notifications
- **File Upload**: Cloudinary integration for media files

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp config/env.example .env
   ```
   Edit `.env` with your configuration

4. Seed the database:
   ```bash
   npm run seed
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

Server runs on: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses/:id/enroll` - Enroll in course

### Certificates
- `GET /api/certificates` - Get user certificates
- `GET /api/certificates/verify/:code` - Verify certificate

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `POST /api/jobs/:id/apply` - Apply for job

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/progress` - Get learning progress
- `PUT /api/users/progress/:courseId` - Update course progress

### Health Check
- `GET /health` - Server health status

## Database Models

### User Model
- Personal information (name, email, phone, location)
- Role-based access (student, artisan, employer, teacher, admin)
- Language preferences
- Enrolled courses and progress
- Certificates and job applications

### Course Model
- Course details (title, description, category, level)
- Multi-language support
- Module structure with content
- Certification information
- Enrollment tracking

### Certificate Model
- Certificate details and verification codes
- Issuer information (NABTEB, ITF, TRCN, LernBase)
- Status tracking (valid, expired, revoked)
- Skills and scores

### Job Model
- Job posting details
- Location and salary information
- Required certificates and skills
- Application tracking
- Employer information

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/lernbase

# JWT
JWT_SECRET=your-super-secret-jwt-key

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests

## Sample Data

The seeding script creates:
- Admin user: `admin@lernbase.ng` / `admin123`
- Teacher user: `teacher@lernbase.ng` / `teacher123`
- 6 sample courses across different categories
- Sample certificates and job postings

## Production Deployment

### Deploy to Heroku
```bash
heroku create lernbase-api
heroku addons:create mongolab:sandbox
heroku config:set JWT_SECRET=your-production-secret
git push heroku main
```

### Deploy to Railway
```bash
railway login
railway init
railway up
```

### Deploy to DigitalOcean App Platform
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## Security Features

- Helmet.js for security headers
- CORS configuration
- Password hashing with bcrypt
- JWT token authentication
- Input validation
- Rate limiting (can be added)

## Testing

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


