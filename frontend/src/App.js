import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import JobListings from './pages/JobListings';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <nav style={{ padding: '15px', backgroundColor: '#1976D2', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>SmartHire 🚀</h2>
        {isLoggedIn && (
          <div>
            <Link to="/jobs" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Jobs</Link>
            <Link to="/dashboard" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Dashboard</Link>
            <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>Logout</button>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/jobs" /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/jobs" element={
          isLoggedIn ? <JobListings /> : <Navigate to="/login" />
        } />
        <Route path="/dashboard" element={
          isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;