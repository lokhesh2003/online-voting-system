import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Voters from './pages/Voters';
import Vote from './pages/Vote';
import Results from './pages/Results';
import Login from './pages/Login';

const getStoredUser = () => {
  const raw = localStorage.getItem('activeUser');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

function RequireRole({ role, children }) {
  const user = getStoredUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role === 'ADMIN' && user.role !== 'ADMIN') {
    return <Navigate to="/user/vote" replace />;
  }
  if (role === 'USER' && user.role !== 'USER') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<RequireRole role="ADMIN"><AdminLayout /></RequireRole>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="voters" element={<Voters />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="results" element={<Results />} />
          <Route path="vote" element={<Vote />} />
        </Route>

        <Route path="/user" element={<RequireRole role="USER"><UserLayout /></RequireRole>}>
          <Route index element={<Navigate to="/user/vote" replace />} />
          <Route path="vote" element={<Vote />} />
          <Route path="results" element={<Results />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
