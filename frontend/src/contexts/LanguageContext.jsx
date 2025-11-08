import React, { createContext, useContext, useState, useEffect } from 'react';

// Translations object
const translations = {
  en: {
    appName: 'LernBase Nigeria',
    tagline: 'Skills for Success',
    welcome: 'Welcome',
    login: 'Login',
    email: 'Email',
    password: 'Password',
    selectRole: 'Select Your Role',
    student: 'Student',
    artisan: 'Artisan/Worker',
    employer: 'Employer',
    teacher: 'Teacher',
    dashboard: 'Dashboard',
    courses: 'My Courses',
    certificates: 'Certificates',
    jobs: 'Find Jobs',
    profile: 'Profile',
    logout: 'Logout',
    continueLesson: 'Continue',
    viewCertificate: 'View',
    applyNow: 'Apply Now',
    activeCourses: 'Active Courses',
    avgProgress: 'Avg Progress',
    allCategories: 'All',
    tradeSkills: 'Trade Skills',
    techSkills: 'Tech Skills',
    creativeSkills: 'Creative Skills',
    upload: 'Upload',
    search: 'Search'
  },
  ha: {
    appName: 'LernBase Najeriya',
    tagline: 'Hanyoyin Nasara',
    welcome: 'Barka da zuwa',
    login: 'Shiga',
    email: 'Imel',
    password: 'Kalmar Sirri',
    selectRole: 'Zaɓi Matsayin Ka',
    student: 'Ɗalibi',
    artisan: 'Mai Sana\'a',
    employer: 'Mai Aiki',
    teacher: 'Malami',
    dashboard: 'Dashboard',
    courses: 'Darussan Na',
    certificates: 'Takardun Shaida',
    jobs: 'Neman Aiki',
    profile: 'Bayanai',
    logout: 'Fita',
    continueLesson: 'Ci gaba',
    viewCertificate: 'Duba',
    applyNow: 'Yi Nema',
    activeCourses: 'Darussan da Ake Yi',
    avgProgress: 'Matsakaicin Ci gaba',
    allCategories: 'Duka',
    tradeSkills: 'Hanyoyin Kasuwanci',
    techSkills: 'Hanyoyin Fasaha',
    creativeSkills: 'Hanyoyin Kirkire-kirkire',
    upload: 'Saka',
    search: 'Bincika'
  },
  yo: {
    appName: 'LernBase Naijiria',
    tagline: 'Ọgbọn fun Aṣeyọri',
    welcome: 'Káàbọ̀',
    login: 'Wọlẹ',
    email: 'Imeeli',
    password: 'Ọrọ Aṣínà',
    selectRole: 'Yan Ipa Rẹ',
    student: 'Akẹkọọ',
    artisan: 'Oníṣẹ-ọwọ',
    employer: 'Olùdáni',
    teacher: 'Olùkọ',
    dashboard: 'Dashboard',
    courses: 'Awọn Ẹkọ Mi',
    certificates: 'Ijẹrisi',
    jobs: 'Wa Iṣẹ',
    profile: 'Àkọsílẹ̀',
    logout: 'Jáde',
    continueLesson: 'Tẹsiwaju',
    viewCertificate: 'Wo',
    applyNow: 'Ṣe Ìbéèrè',
    activeCourses: 'Awọn Ẹkọ Lọwọlọwọ',
    avgProgress: 'Ìlọsíwájú Apapọ',
    allCategories: 'Gbogbo',
    tradeSkills: 'Ọgbọn Iṣowo',
    techSkills: 'Ọgbọn Imọ-ẹrọ',
    creativeSkills: 'Ọgbọn Ìdá',
    upload: 'Gbe Soke',
    search: 'Wá'
  }
};

// Create Language Context
export const LanguageContext = createContext(null);

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use Language Context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
