import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserSquare2, Layers, BarChart3, CheckSquare } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        E-VOTING SYSTEM <span className="highlight">ADMIN</span>
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/admin/dashboard" className={({isActive}) => isActive ? "active" : ""}>
            <LayoutDashboard /> Admin Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/voters" className={({isActive}) => isActive ? "active" : ""}>
            <Users /> Voters
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/candidates" className={({isActive}) => isActive ? "active" : ""}>
            <UserSquare2 /> Candidates
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/vote" className={({isActive}) => isActive ? "active" : ""}>
            <CheckSquare /> Voting Page
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/results" className={({isActive}) => isActive ? "active" : ""}>
            <BarChart3 /> Voting Result
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
