import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Signup from './Signup';
import '../styles/login.css';

const Login = ({ onSuccess }) => {
  const { login, loading } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password, role });
      onSuccess();
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleSwitchToSignup = () => {
    setShowSignup(true);
    setError('');
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setError('');
  };

  if (showSignup) {
    return <Signup onSuccess={onSuccess} onSwitchToLogin={handleSwitchToLogin} />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>{t('appName')}</h1>
          <p>{t('tagline')}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('selectRole')}</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select">
              <option value="student">{t('student')}</option>
              <option value="artisan">{t('artisan')}</option>
              <option value="employer">{t('employer')}</option>
              <option value="teacher">{t('teacher')}</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Loading...' : t('login')}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            Don't have an account?{' '}
            <button type="button" onClick={handleSwitchToSignup} className="switch-btn">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
