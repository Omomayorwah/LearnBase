import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import App from './App';

const Root = () => (
  <ThemeProvider>
    <LanguageProvider>
      <AuthProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
    </LanguageProvider>
  </ThemeProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
