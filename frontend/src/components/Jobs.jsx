import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockAPI } from '../services/mockAPI';
import '../styles/pages.css';

const Jobs = () => {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    mockAPI.getJobs().then(res => setJobs(res.data));
  }, []);

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>{t('jobs')}</h2>
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder={`${t('search')}...`} />
        </div>
      </div>

      <div className="jobs-list">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <div>
                <h4>{job.title}</h4>
                <p>{job.company}</p>
              </div>
              <span className="job-type">{job.type}</span>
            </div>
            <div className="job-details">
              <span>📍 {job.location}</span>
              <span>💰 ₦{job.salary}</span>
            </div>
            <p className="job-req">{job.requirements}</p>
            <button className="btn-primary">{t('applyNow')}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
