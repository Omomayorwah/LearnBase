import React from 'react';
import { LogOut, Mail, Phone, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="page-content">
      <div className="profile-header">
        <div className="profile-avatar">{user?.name?.charAt(0)}</div>
        <div>
          <h2>{user?.name}</h2>
          <p>{user?.role}</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-row">
          <Mail size={20} />
          <span>{user?.email}</span>
        </div>
        <div className="detail-row">
          <Phone size={20} />
          <span>{user?.phone}</span>
        </div>
        <div className="detail-row">
          <Home size={20} />
          <span>{user?.location}</span>
        </div>
      </div>

      <div className="profile-actions">
        <button className="btn-secondary">Edit Profile</button>
        <button className="btn-danger" onClick={logout}>
          <LogOut size={18} /> {t('logout')}
        </button>
      </div>
    </div>
  );
};

export default Profile;
