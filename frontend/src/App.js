import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import JobListings from './pages/JobListings';
import Dashboard from './pages/Dashboard';
import './App.css';
import { getUserRole } from './services/api';
import Register from './pages/Register';

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
   const [userRole, setUserRole] = useState(getUserRole());

   const handleLogin = () => {
     setIsLoggedIn(true);
     const role = getUserRole();
     console.log('Role after login:', role); // debug
     setUserRole(role);
   };

   useEffect(() => {
     const role = getUserRole();
     console.log('Initial role:', role);
     setUserRole(role);
   }, []);

   const handleLogout = () => {
     localStorage.removeItem('token');
     setIsLoggedIn(false);
     setUserRole(null);
   };

  return (
    <Router>
      <nav style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #2563eb 100%)',
        padding: '0 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>🚀</span>
          <span style={{ color: 'white', fontWeight: '800', fontSize: '20px', letterSpacing: '-0.5px' }}>
            Smart<span style={{ color: '#93c5fd' }}>Hire</span>
          </span>
        </div>
        {isLoggedIn && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link to="/jobs" style={{
              color: 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}>💼 Jobs</Link>
            <Link to="/dashboard" style={{
              color: 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14px'
            }}>📊 Dashboard</Link>
            <button onClick={handleLogout} style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>Logout</button>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/jobs" /> : <Login onLogin={handleLogin} />} />
        <Route path="/jobs" element={isLoggedIn ? <JobListings userRole={userRole} /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard userRole={userRole} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
       <Route path="/register" element={isLoggedIn ? <Navigate to="/jobs" /> : <Register onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;