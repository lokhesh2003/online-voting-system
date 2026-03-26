import { useState, useEffect, useRef } from 'react';
import { Search, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const raw = localStorage.getItem('activeUser');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem('activeUser');
    navigate('/login');
  };

  const username = user?.name || (user?.email ? user.email.split('@')[0] : 'Guest');
  const initials = username
    .split(' ')
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .join('');

  const displayText = user?.role === 'ADMIN' ? 'Admin' : user?.role === 'USER' ? 'Voter' : 'Guest';

  return (
    <div className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ fontSize: '20px', cursor: 'pointer' }}>≡</div>
        <div className="navbar-search">
          <Search size={16} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="navbar-user" ref={menuRef} style={{ position: 'relative', cursor: 'pointer' }}>
        <img
          src={`https://ui-avatars.com/api/?name=${initials || 'AD'}&background=0D8ABC&color=fff`}
          alt="User"
          onClick={() => setMenuOpen(prev => !prev)}
          style={{ width: 35, height: 35, borderRadius: '50%' }}
        />
        <span onClick={() => setMenuOpen(prev => !prev)}>{displayText} ({username}) ▾</span>

        {menuOpen && (
          <div style={{ position: 'absolute', right: 0, top: '125%', background: '#fff', border: '1px solid #ddd', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', borderRadius: '6px', minWidth: 160, zIndex: 1000 }}>
            <button
              style={{ width: '100%', textAlign: 'left', padding: '10px', border: 'none', background: 'transparent', cursor: 'pointer' }}
              onClick={() => {
                setMenuOpen(false);
                if (user?.role === 'ADMIN') navigate('/admin/dashboard');
                else navigate('/user/vote');
              }}
            >
              <User size={14} style={{ marginRight: 8 }} />
              Profile
            </button>
            <button
              style={{ width: '100%', textAlign: 'left', padding: '10px', border: 'none', background: 'transparent', cursor: 'pointer' }}
              onClick={logout}
            >
              <LogOut size={14} style={{ marginRight: 8 }} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
