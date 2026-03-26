import { useState } from 'react';
import axios from 'axios';
import { UserCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_URL || '/api';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${apiBaseUrl}/auth/login`, { email, password });
      const user = res.data;
      if (!user || !user.role) {
        setError('Login failed: user role missing from server response.');
        return;
      }

      localStorage.setItem('activeUser', JSON.stringify(user));
      if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/user/vote');
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.data || err?.message || 'Server unavailable';
      setError(`Login failed: ${message}`);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { email, password, name: email.split('@')[0] || 'User', role };
      await axios.post(`${apiBaseUrl}/auth/register`, payload);
      setError('Registration successful. Please log in.');
      setIsRegister(false);
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.data || err?.message || 'Server unavailable';
      setError(`Registration failed: ${message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <UserCheck size={48} color="var(--color-primary)" style={{ marginBottom: '10px' }} />
        <h2>{role === 'ADMIN' ? 'Admin Login' : 'Voter Login'}</h2>

        <div style={{ marginBottom: '16px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            type="button"
            className={role === 'ADMIN' ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setRole('ADMIN')}
            style={{ padding: '8px 16px' }}
          >
            Admin
          </button>
          <button
            type="button"
            className={role === 'USER' ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setRole('USER')}
            style={{ padding: '8px 16px' }}
          >
            Voter
          </button>
        </div>

        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {isRegister && (
            <div className="form-group">
              <label>Role</label>
              <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          )}
          {error && <p style={{ color: error.startsWith('Registration successful') ? 'green' : 'red', fontSize: '14px' }}>{error}</p>}
          <button type="submit" className="btn-primary btn-block">{isRegister ? 'Register' : 'Sign In'}</button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '13px', color: '#777' }}>
          By using this app, you can register or sign in with your own email/password.
        </p>
        <p style={{ marginTop: '10px', fontSize: '13px' }}>
          {isRegister ? (
            <>Already registered? <button type="button" className="btn-link" onClick={() => setIsRegister(false)}>Sign in</button>.</>
          ) : (
            <>New user? <button type="button" className="btn-link" onClick={() => setIsRegister(true)}>Register here</button>.</>
          )}
        </p>
      </div>
    </div>
  );
}
