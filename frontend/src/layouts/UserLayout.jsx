import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function UserLayout() {
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="page-container" style={{ width: '100%', padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}
