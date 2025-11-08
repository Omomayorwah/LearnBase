import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Certificates from './components/Certificates';
import Jobs from './components/Jobs';
import Profile from './components/Profile';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './styles/global.css';
import './styles/layout.css';

const App = () => {
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!auth?.user);
  }, [auth?.user]);

  if (!isLoggedIn) {
    return <Login onSuccess={() => setIsLoggedIn(true)} />;
  }

  const pages = {
    dashboard: <Dashboard />,
    courses: <Courses />,
    certificates: <Certificates />,
    jobs: <Jobs />,
    profile: <Profile />
  };

  return (
    <div className="app">
      <Header onMenuToggle={() => setSidebarOpen(true)} />
      <Sidebar 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="main">{pages[currentPage]}</main>
      <Footer />
    </div>
  );
};

export default App;
