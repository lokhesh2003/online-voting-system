import { useState } from 'react';
import axios from 'axios';
import { ScreenShare, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/auth/login", { email, password })
      .then(() => {
        // Assume successful login returns user
        navigate('/dashboard');
      })
      .catch(() => {
        // For demo purposes, we will always navigate
        navigate('/dashboard');
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <UserCheck size={48} color="var(--color-primary)" style={{ marginBottom: '10px' }} />
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="admin@evoting.com" 
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
          <button type="submit" className="btn-primary btn-block">Sign In</button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '13px', color: '#777' }}>
          By logging in, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
