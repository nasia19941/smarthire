import React, { useState, useEffect } from 'react';
import { getJobPostings, createApplication } from '../services/api';

function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getJobPostings()
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleApply = async (jobId) => {
    const cvText = prompt('Paste your CV text:');
    if (!cvText) return;

    try {
      const userId = localStorage.getItem('userId') || 1;
      await createApplication({
        cvUrl: cvText,
        jobPosting: { id: jobId },
        user: { id: userId }
      });
      setMessage('Application submitted! AI is analyzing your CV...');
    } catch (err) {
      setMessage('Error submitting application');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h2>Available Jobs 💼</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {jobs.map(job => (
        <div key={job.id} style={{
          border: '1px solid #ddd',
          padding: '20px',
          marginBottom: '20px',
          borderRadius: '8px'
        }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Work Type:</strong> {job.workType}</p>
          <p><strong>Salary:</strong> {job.salary}€</p>
          <p><strong>Requirements:</strong> {job.requirements}</p>
          <button
            onClick={() => handleApply(job.id)}
            style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Apply Now 🚀
          </button>
        </div>
      ))}
    </div>
  );
}

export default JobListings;