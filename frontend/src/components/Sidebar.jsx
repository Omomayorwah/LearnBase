import React from 'react';
import { Home, BookOpen, Award, Briefcase, Users, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/layout.css';

const Sidebar = ({ currentPage, onPageChange, isOpen, onClose }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'profile', icon: Users, label: t('profile') },
    { id: 'dashboard', icon: Home, label: t('dashboard') },
    { id: 'courses', icon: BookOpen, label: t('courses') },
    { id: 'certificates', icon: Award, label: t('certificates') },
    { id: 'jobs', icon: Briefcase, label: t('jobs') },
  ];

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <nav>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onPageChange(item.id); onClose(); }}
              className={currentPage === item.id ? 'active' : ''}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
