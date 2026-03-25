import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Voters from './pages/Voters';
import Vote from './pages/Vote';
import Results from './pages/Results';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes with Layout */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="voters" element={<Voters />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="results" element={<Results />} />
          <Route path="vote" element={<Vote />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
