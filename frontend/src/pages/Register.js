import React, { useState } from 'react';
import { register } from '../services/api';
import { Link } from 'react-router-dom';

function Register({ onLogin }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await register(form);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userRole', response.data.role);
      onLogin();
    } catch (err) {
      setError('Registration failed. Email may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white', borderRadius: '20px', padding: '48px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🚀</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>
            Smart<span style={{ color: '#2563eb' }}>Hire</span>
          </h1>
          <p style={{ color: '#64748b', marginTop: '8px', fontSize: '14px' }}>
            Create your account
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            color: '#dc2626', padding: '12px 16px', borderRadius: '8px',
            marginBottom: '20px', fontSize: '14px'
          }}>⚠️ {error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="johndoe"
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
              required
            />
          </div>
          <div style={{ marginBottom: '28px' }}>
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{
            width: '100%',
            background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: 'white', padding: '14px', fontSize: '16px',
            fontWeight: '700', borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
          }}>
            {loading ? '⏳ Creating account...' : '→ Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#2563eb', fontWeight: '600' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;