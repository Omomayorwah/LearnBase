import React, { useState, useEffect } from 'react';
import { BookOpen, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockAPI } from '../services/mockAPI';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockAPI.getCourses().then(res => {
      setCourses(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-content">
      <div className="welcome-section">
        <h2>{t('welcome')}, {user?.name}!</h2>
        <p>Continue your learning journey</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <BookOpen size={32} className="stat-icon" />
          <div>
            <h3>{courses.length}</h3>
            <p>{t('activeCourses')}</p>
          </div>
        </div>
        <div className="stat-card">
          <Award size={32} className="stat-icon" />
          <div>
            <h3>2</h3>
            <p>{t('certificates')}</p>
          </div>
        </div>
        <div className="stat-card">
          <TrendingUp size={32} className="stat-icon" />
          <div>
            <h3>65%</h3>
            <p>{t('avgProgress')}</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>{t('courses')}</h3>
        <div className="courses-grid">
          {courses.slice(0, 3).map(course => (
            <div key={course.id} className="course-card">
              <h4>{course.title}</h4>
              <span className="badge">{course.level}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${course.progress}%` }} />
              </div>
              <p>{course.progress}% Complete</p>
              <button className="btn-secondary">{t('continueLesson')}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
