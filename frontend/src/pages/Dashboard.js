import React, { useState, useEffect } from 'react';
import { getApplications, getMyApplications, getApplicationsByJob, getJobPostings, createJobPosting } from '../services/api';
import api from '../services/api';

function Dashboard({ userRole }) {
const handleStatusUpdate = async (appId, newStatus) => {
  try {
    await api.put(`/api/application/${appId}/status`, newStatus, {
      headers: { 'Content-Type': 'application/json' }
    });
    // Refresh applications
    const updatedApps = { ...jobApplications };
    for (const jobId in updatedApps) {
      updatedApps[jobId] = updatedApps[jobId].map(app =>
        app.id === appId ? { ...app, applicationStatus: newStatus } : app
      );
    }
    setJobApplications(updatedApps);
  } catch (err) {
    console.error('Error updating status:', err);
  }
};
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [jobApplications, setJobApplications] = useState({});
  const [job, setJob] = useState({
    title: '', description: '', requirements: '',
    location: '', workSchedule: '', workType: 'HYBRID',
    salary: '', benefits: '', status: 'OPEN',
    company: { id: 1 }
  });

  const isHR = userRole === 'HR_MANAGER' || userRole === 'ADMIN';

  useEffect(() => {
    if (isHR) {
      // HR: φόρτωσε jobs και applications ανά job
      getJobPostings()
        .then(async res => {
          setJobs(res.data);
          const appsByJob = {};
          for (const j of res.data) {
            try {
              const appsRes = await getApplicationsByJob(j.id);
              appsByJob[j.id] = appsRes.data;
            } catch {
              appsByJob[j.id] = [];
            }
          }
          setJobApplications(appsByJob);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else {
      const userId = localStorage.getItem('userId') || 1;
      getMyApplications(userId)
        .then(res => setApplications(res.data))
        .catch(err => {
          getApplications()
            .then(r => setApplications(r.data))
            .catch(console.error);
        })
        .finally(() => setLoading(false));
    }
  }, [isHR]);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createJobPosting(job);
      setMessage('✅ Job posting created successfully!');
      setShowForm(false);
      setJob({ title: '', description: '', requirements: '', location: '', workSchedule: '', workType: 'HYBRID', salary: '', benefits: '', status: 'OPEN', company: { id: 1 } });
      setTimeout(() => setMessage(''), 4000);
      // Refresh jobs
      const res = await getJobPostings();
      setJobs(res.data);
    } catch (err) {
      setMessage('❌ Error creating job posting');
    } finally {
      setSubmitting(false);
    }
  };

  const statusColor = (status) => {
    if (status === 'ACCEPTED') return { bg: '#dcfce7', color: '#16a34a' };
    if (status === 'REJECTED') return { bg: '#fee2e2', color: '#dc2626' };
    if (status === 'REVIEWED') return { bg: '#dbeafe', color: '#2563eb' };
    return { bg: '#fef9c3', color: '#ca8a04' };
  };

  const scoreColor = (score) => {
    if (score >= 70) return '#16a34a';
    if (score >= 40) return '#ca8a04';
    return '#dc2626';
  };

  // ====== CANDIDATE VIEW ======
  if (!isHR) {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
          📋 My Applications
        </h1>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>
          {applications.length} application{applications.length !== 1 ? 's' : ''} submitted
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
            <p>Loading your applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div style={{
            background: 'white', borderRadius: '16px', padding: '60px',
            textAlign: 'center', color: '#64748b', border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📭</div>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>No applications yet</p>
            <p style={{ fontSize: '14px' }}>Go to Jobs to apply for a position!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {applications.map(app => {
              const sc = statusColor(app.applicationStatus);
              return (
                <div key={app.id} style={{
                  background: 'white', borderRadius: '16px', padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                        {app.jobPosting?.title || 'Job Position'}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
                        🏢 {app.jobPosting?.company?.companyName || 'Company'}
                      </p>
                      <p style={{ fontSize: '13px', color: '#64748b' }}>
                        📅 Submitted: {new Date(app.submittedAt).toLocaleDateString('el-GR')}
                      </p>
                    </div>
                    <span style={{
                      background: sc.bg, color: sc.color,
                      padding: '6px 14px', borderRadius: '20px',
                      fontSize: '13px', fontWeight: '700'
                    }}>
                      {app.applicationStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ====== HR MANAGER VIEW ======
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>📊 HR Dashboard</h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>{jobs.length} job posting{jobs.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm ? '#f1f5f9' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: showForm ? '#64748b' : 'white',
            padding: '12px 24px', borderRadius: '10px', fontWeight: '700',
            boxShadow: showForm ? 'none' : '0 4px 12px rgba(37,99,235,0.25)'
          }}
        >
          {showForm ? '✕ Cancel' : '+ New Job Posting'}
        </button>
      </div>

      {message && (
        <div style={{
          background: message.includes('✅') ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${message.includes('✅') ? '#bbf7d0' : '#fecaca'}`,
          color: message.includes('✅') ? '#16a34a' : '#dc2626',
          padding: '14px 18px', borderRadius: '10px', marginBottom: '24px', fontWeight: '500'
        }}>
          {message}
        </div>
      )}

      {showForm && (
        <div style={{
          background: 'white', borderRadius: '16px', padding: '32px',
          marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', color: '#1e293b' }}>
            📝 Create New Job Posting
          </h2>
          <form onSubmit={handleCreateJob}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              {[
                { key: 'title', label: 'Job Title', placeholder: 'e.g. Junior Java Developer' },
                { key: 'location', label: 'Location', placeholder: 'e.g. Athens, Greece' },
                { key: 'workSchedule', label: 'Work Schedule', placeholder: 'e.g. Full-time' },
                { key: 'salary', label: 'Salary (€)', placeholder: 'e.g. 25000' },
              ].map(field => (
                <div key={field.key}>
                  <label>{field.label}</label>
                  <input
                    value={job[field.key]}
                    onChange={(e) => setJob({ ...job, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label>Work Type</label>
              <select value={job.workType} onChange={(e) => setJob({ ...job, workType: e.target.value })}>
                <option value="HYBRID">Hybrid</option>
                <option value="REMOTE">Remote</option>
                <option value="ON_SITE">On Site</option>
              </select>
            </div>
            {[
              { key: 'description', label: 'Description', placeholder: 'Job description...' },
              { key: 'requirements', label: 'Requirements', placeholder: 'Java, Spring Boot, SQL...' },
              { key: 'benefits', label: 'Benefits', placeholder: 'Health insurance...' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '16px' }}>
                <label>{field.label}</label>
                <textarea
                  value={job[field.key]}
                  onChange={(e) => setJob({ ...job, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  rows={3}
                  style={{ resize: 'vertical' }}
                />
              </div>
            ))}
            <button type="submit" disabled={submitting} style={{
              background: submitting ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: 'white', padding: '12px 28px', borderRadius: '10px',
              fontWeight: '700', boxShadow: '0 4px 12px rgba(37,99,235,0.25)'
            }}>
              {submitting ? '⏳ Creating...' : '✓ Create Job Posting'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
          <p>Loading...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div style={{
          background: 'white', borderRadius: '16px', padding: '60px',
          textAlign: 'center', color: '#64748b', border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📭</div>
          <p>No job postings yet. Create your first one!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {jobs.map(j => {
            const apps = jobApplications[j.id] || [];
            return (
              <div key={j.id} style={{
                background: 'white', borderRadius: '16px', padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
                      {j.title}
                    </h2>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>
                      📍 {j.location} • ⏰ {j.workSchedule} • 💶 {j.salary?.toLocaleString()}€
                    </p>
                  </div>
                  <div style={{
                    background: '#dbeafe', color: '#2563eb',
                    padding: '8px 16px', borderRadius: '20px',
                    fontWeight: '700', fontSize: '14px'
                  }}>
                    {apps.length} applicant{apps.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {apps.length > 0 && (
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                    <p style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase' }}>
                      Applications
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {apps.map(app => {
                        const sc = statusColor(app.applicationStatus);
                        return (
                          <div key={app.id} style={{
                            background: '#f8fafc', borderRadius: '10px', padding: '14px 16px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                          }}>
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                                Application #{app.id}
                              </p>
                              <p style={{ fontSize: '12px', color: '#64748b' }}>
                                {app.cvUrl?.substring(0, 80)}...
                              </p>
                              {app.aiSummary && app.aiSummary !== 'AI analysis unavailable' && (
                                <p style={{ fontSize: '12px', color: '#2563eb', marginTop: '4px', fontStyle: 'italic' }}>
                                  🤖 {app.aiSummary}
                                </p>
                              )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '22px', fontWeight: '800', color: scoreColor(app.aiScore) }}>
                                  {app.aiScore}
                                </div>
                                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '600' }}>AI SCORE</div>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                                <div style={{ textAlign: 'center' }}>
                                  <div style={{ fontSize: '22px', fontWeight: '800', color: scoreColor(app.aiScore) }}>
                                    {app.aiScore}
                                  </div>
                                  <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '600' }}>AI SCORE</div>
                                </div>
                                <span style={{
                                  background: sc.bg, color: sc.color,
                                  padding: '4px 10px', borderRadius: '20px',
                                  fontSize: '11px', fontWeight: '700'
                                }}>
                                  {app.applicationStatus}
                                </span>
                                {app.applicationStatus === 'PENDING' && (
                                  <div style={{ display: 'flex', gap: '6px' }}>
                                    <button
                                      onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}
                                      style={{
                                        background: '#dcfce7', color: '#16a34a',
                                        padding: '4px 10px', borderRadius: '6px',
                                        fontSize: '11px', fontWeight: '700', border: 'none'
                                      }}
                                    >✓ Accept</button>
                                    <button
                                      onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                                      style={{
                                        background: '#fee2e2', color: '#dc2626',
                                        padding: '4px 10px', borderRadius: '6px',
                                        fontSize: '11px', fontWeight: '700', border: 'none'
                                      }}
                                    >✕ Reject</button>
                                  </div>
                                )}
                              </div>
                                {app.applicationStatus}
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;