import React, { useState, useEffect } from 'react';
import { Award, Upload, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockAPI } from '../services/mockAPI';
import '../styles/pages.css';

const Certificates = () => {
  const { t } = useLanguage();
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    mockAPI.getCertificates().then(res => setCertificates(res.data));
  }, []);

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>{t('certificates')}</h2>
        <button className="btn-primary">
          <Upload size={18} /> {t('upload')}
        </button>
      </div>

      <div className="certs-grid">
        {certificates.map(cert => (
          <div key={cert.id} className="cert-card">
            <img src={cert.image} className="cert-icon" width='50%' />
            <h4>{cert.title}</h4>
            <p>Issued by: {cert.issuer}</p>
            <p className="cert-date">{new Date(cert.date).toLocaleDateString()}</p>
            <div className="cert-status">
              <CheckCircle size={16} /> {cert.status}
            </div>
            <p className="cert-code">{cert.verificationCode}</p>
            <button className="btn-secondary">{t('viewCertificate')}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
