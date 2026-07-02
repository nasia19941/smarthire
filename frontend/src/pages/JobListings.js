import React, { useState, useEffect } from 'react';
import { getJobPostings, createApplication } from '../services/api';

function JobListings({ userRole }) {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);

  useEffect(() => {
    getJobPostings()
      .then(res => setJobs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleApply = async (jobId) => {
    const cvText = prompt('📄 Paste your CV text:');
    if (!cvText) return;

    setApplying(jobId);
    try {
      const userId = localStorage.getItem('userId') || 1;
      await createApplication({
        cvUrl: cvText,
        jobPosting: { id: jobId },
        user: { id: userId }
      });
      setMessage('✅ Application submitted successfully!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage('❌ Error submitting application');
    } finally {
      setApplying(null);
    }
  };

  const workTypeColor = (type) => {
    if (type === 'REMOTE') return { bg: '#dcfce7', color: '#16a34a' };
    if (type === 'HYBRID') return { bg: '#dbeafe', color: '#2563eb' };
    return { bg: '#f3e8ff', color: '#9333ea' };
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>
      <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
      <p>Loading jobs...</p>
    </div>
  );

  const isHR = userRole === 'HR_MANAGER' || userRole === 'ADMIN';

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>
          {isHR ? '📋 My Job Postings' : '💼 Available Jobs'}
        </h1>
        <p style={{ color: '#64748b', marginTop: '4px' }}>
          {jobs.length} position{jobs.length !== 1 ? 's' : ''} {isHR ? 'posted' : 'available'}
        </p>
      </div>

      {message && (
        <div style={{
          background: message.includes('✅') ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${message.includes('✅') ? '#bbf7d0' : '#fecaca'}`,
          color: message.includes('✅') ? '#16a34a' : '#dc2626',
          padding: '14px 18px',
          borderRadius: '10px',
          marginBottom: '24px',
          fontWeight: '500'
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {jobs.map(job => {
          const wt = workTypeColor(job.workType);
          return (
            <div key={job.id} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                    {job.title}
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '14px' }}>
                    🏢 {job.company?.companyName || 'Company'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <span style={{
                    background: wt.bg, color: wt.color,
                    padding: '4px 12px', borderRadius: '20px',
                    fontSize: '12px', fontWeight: '600'
                  }}>
                    {job.workType}
                  </span>
                  <span style={{
                    background: '#f0fdf4', color: '#16a34a',
                    padding: '4px 12px', borderRadius: '20px',
                    fontSize: '12px', fontWeight: '600'
                  }}>
                    {job.status}
                  </span>
                </div>
              </div>

              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                {job.description}
              </p>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '13px', color: '#64748b' }}>📍 {job.location || 'Athens, Greece'}</span>
                <span style={{ fontSize: '13px', color: '#64748b' }}>⏰ {job.workSchedule}</span>
                {job.salary && (
                  <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: '600' }}>
                    💶 {job.salary?.toLocaleString()}€/year
                  </span>
                )}
              </div>

              {job.requirements && (
                <div style={{
                  background: '#f8fafc', borderRadius: '8px',
                  padding: '12px 16px', marginBottom: '20px'
                }}>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '4px' }}>REQUIREMENTS</p>
                  <p style={{ fontSize: '13px', color: '#475569' }}>{job.requirements}</p>
                </div>
              )}

              {!isHR && (
                <button
                  onClick={() => handleApply(job.id)}
                  disabled={applying === job.id}
                  style={{
                    background: applying === job.id ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    boxShadow: '0 4px 12px rgba(37,99,235,0.25)'
                  }}
                >
                  {applying === job.id ? '⏳ Submitting...' : '🚀 Apply Now'}
                </button>
              )}

              {isHR && (
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  display: 'inline-block'
                }}>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                    📊 Posted by HR Manager
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default JobListings;