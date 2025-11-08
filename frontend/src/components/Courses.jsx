import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockAPI } from '../services/mockAPI';
import '../styles/dashboard.css';
import '../styles/pages.css';

const Courses = () => {
  const { t } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    mockAPI.getCourses().then(res => setCourses(res.data));
  }, []);

  const filters = [
    { id: 'all', label: t('allCategories') },
    { id: 'Trade Skills', label: t('tradeSkills') },
    { id: 'Tech Skills', label: t('techSkills') },
    { id: 'Creative Skills', label: t('creativeSkills') }
  ];

  const filtered = filter === 'all' ? courses : courses.filter(c => c.category === filter);

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>{t('courses')}</h2>
        <div className="filter-btns">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={filter === f.id ? 'active' : ''}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="courses-grid">
        {filtered.map(course => (
          <div key={course.id} className="course-card-large">
            <div >
              <img src={course.image} width='80%' className='course-icon' />
            </div>
            <h4>{course.title}</h4>
            <p className="course-cat">{course.category}</p>
            <div className="course-meta">
              <span>{course.level}</span>
              <span>{course.duration}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${course.progress}%` }} />
            </div>
            <button className="btn-primary">{t('continueLesson')}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
