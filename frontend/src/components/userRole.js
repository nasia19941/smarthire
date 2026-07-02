<Route path="/jobs" element={
  isLoggedIn ? <JobListings userRole={userRole} /> : <Navigate to="/login" />
} />
<Route path="/dashboard" element={
  isLoggedIn ? <Dashboard userRole={userRole} /> : <Navigate to="/login" />
} />