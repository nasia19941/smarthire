import React, { useState, useEffect } from 'react';
import { getApplications, createJobPosting } from '../services/api';

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [job, setJob] = useState({
    title: '', description: '', requirements: '',
    location: '', workSchedule: '', workType: 'HYBRID',
    salary: '', benefits: '', status: 'OPEN',
    company: { id: 1 }
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    getApplications()
      .then(res => setApplications(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await createJobPosting(job);
      setMessage('Job posting created!');
      setShowForm(false);
    } catch (err) {
      setMessage('Error creating job posting');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <h2>HR Dashboard 📊</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{ padding: '10px 20px', marginBottom: '20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        {showForm ? 'Cancel' : '+ New Job Posting'}
      </button>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {showForm && (
        <form onSubmit={handleCreateJob} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
          <h3>Create Job Posting</h3>
          {['title', 'description', 'requirements', 'location', 'workSchedule', 'salary', 'benefits'].map(field => (
            <div key={field}>
              <label>{field}:</label>
              <input
                value={job[field]}
                onChange={(e) => setJob({...job, [field]: e.target.value})}
                style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
              />
            </div>
          ))}
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
            Create
          </button>
        </form>
      )}

      <h3>Applications 📋</h3>
      {applications.map(app => (
        <div key={app.id} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '15px', borderRadius: '8px' }}>
          <p><strong>Application #{app.id}</strong></p>
          <p><strong>Status:</strong> {app.applicationStatus}</p>
          <p><strong>AI Score:</strong> {app.aiScore}/100 🤖</p>
          <p><strong>AI Summary:</strong> {app.aiSummary}</p>
          <p><strong>CV:</strong> {app.cvUrl?.substring(0, 100)}...</p>
          <p><strong>Submitted:</strong> {new Date(app.submittedAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;