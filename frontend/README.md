# LernBase Nigeria Frontend

A React-based frontend application for LernBase Nigeria - Skills for Success platform.

## Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # React components
│   │   ├── Login.js        # Login component
│   │   ├── Dashboard.js    # Dashboard component
│   │   ├── Courses.js      # Courses listing component
│   │   ├── Certificates.js # Certificates component
│   │   ├── Jobs.js         # Jobs listing component
│   │   ├── Profile.js      # User profile component
│   │   ├── Header.js       # App header component
│   │   └── Sidebar.js      # Navigation sidebar component
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.js  # Authentication context
│   │   ├── ThemeContext.js # Theme management context
│   │   └── LanguageContext.js # Internationalization context
│   ├── services/           # API services
│   │   ├── apiService.js   # Real API service
│   │   └── mockAPI.js      # Mock API for development
│   ├── styles/             # CSS stylesheets
│   │   ├── global.css      # Global styles and CSS variables
│   │   ├── login.css       # Login page styles
│   │   ├── layout.css      # Layout components styles
│   │   ├── dashboard.css   # Dashboard and course styles
│   │   ├── pages.css       # Page-specific styles
│   │   └── profile.css     # Profile page styles
│   ├── App.js              # Main App component
│   └── index.js            # Application entry point
└── package.json            # Dependencies and scripts
```

## Features

- **Multi-language Support**: English, Hausa, and Yoruba
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Mobile-friendly interface
- **Authentication**: Login with role-based access
- **Dashboard**: Overview of courses, certificates, and progress
- **Course Management**: Browse and filter courses by category
- **Certificate Management**: View and manage certificates
- **Job Portal**: Browse and apply for jobs
- **User Profile**: Manage user information

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- **React 18** - UI library
- **Lucide React** - Icon library
- **CSS3** - Styling with CSS variables for theming
- **Local Storage** - Data persistence

## API Integration

The app includes both real API service and mock API for development:

- `apiService.js` - Connects to backend API at `http://localhost:5000/api`
- `mockAPI.js` - Provides mock data for development and testing

## Context Providers

- **AuthProvider** - Manages user authentication state
- **ThemeProvider** - Handles dark/light theme switching
- **LanguageProvider** - Manages internationalization

## Styling

The app uses CSS modules with CSS variables for theming:
- Orange (#FF9500) and Navy (#003366) color scheme
- Responsive grid layouts
- Smooth transitions and animations
- Mobile-first design approach

