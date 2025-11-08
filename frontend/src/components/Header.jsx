import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useSearch } from '../contexts/SearchContext';
import SearchInput from './SearchInput';
import NotificationBell from './NotificationBell';
import '../styles/layout.css';

const Header = ({ onMenuToggle }) => {
  const { isDark, setIsDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { performSearch } = useSearch();

  const handleSearch = (searchTerm) => {
    performSearch(searchTerm);
  };

  return (
    <header className="header">
      <button className="menu-btn" onClick={onMenuToggle}>
        <Menu size={24} />
      </button>
      <div style={{fontSize: '0.8rem', color: 'white'}}>
        <h1>{t('appName')}</h1>
      </div>
      <SearchInput 
        onSearch={handleSearch}
        placeholder="Search courses, jobs, certificates..."
      />
      <div className="header-actions">
        <NotificationBell />
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="lang-select">
          <option value="en">ENG</option>
          <option value="ha">HAW</option>
          <option value="yo">YOR</option>
          <option value="yo">IGB</option>
        </select>
        <button onClick={() => setIsDark(!isDark)} className="theme-btn">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
