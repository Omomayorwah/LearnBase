import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/login.css';

const Signup = ({ onSuccess, onSwitchToLogin }) => {
  const { register, loading } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'student',
    location: 'Nigeria',
    language: 'en'
  });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number (10-14 digits)';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const { confirmPassword, ...signupData } = formData;
      await register(signupData);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>{t('appName')}</h1>
          <p>Create your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${validationErrors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
              required
            />
            {validationErrors.name && <div className="field-error">{validationErrors.name}</div>}
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${validationErrors.email ? 'error' : ''}`}
              placeholder="example@email.com"
              required
            />
            {validationErrors.email && <div className="field-error">{validationErrors.email}</div>}
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`form-input ${validationErrors.phone ? 'error' : ''}`}
              placeholder="+234 803 456 7890"
              required
            />
            {validationErrors.phone && <div className="field-error">{validationErrors.phone}</div>}
          </div>

          <div className="form-group">
            <label>Role *</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleInputChange} 
              className="form-select"
            >
              <option value="student">Student</option>
              <option value="artisan">Artisan</option>
              <option value="employer">Employer</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nigeria"
            />
          </div>

          <div className="form-group">
            <label>Preferred Language</label>
            <select 
              name="language" 
              value={formData.language} 
              onChange={handleInputChange} 
              className="form-select"
            >
              <option value="en">English</option>
              <option value="ha">Hausa</option>
              <option value="yo">Yoruba</option>
              <option value="ig">Igbo</option>
              <option value="pidgin">Pidgin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-input ${validationErrors.password ? 'error' : ''}`}
              placeholder="••••••••"
              required
            />
            {validationErrors.password && <div className="field-error">{validationErrors.password}</div>}
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`form-input ${validationErrors.confirmPassword ? 'error' : ''}`}
              placeholder="••••••••"
              required
            />
            {validationErrors.confirmPassword && <div className="field-error">{validationErrors.confirmPassword}</div>}
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            Already have an account?{' '}
            <button type="button" onClick={onSwitchToLogin} className="switch-btn">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
