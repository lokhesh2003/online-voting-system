import { Search } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ fontSize: '20px', cursor: 'pointer' }}>≡</div>
        <div className="navbar-search">
          <Search size={16} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="navbar-user">
        <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin" />
        <span>admin@evoting.com ▾</span>
      </div>
    </div>
  );
}
