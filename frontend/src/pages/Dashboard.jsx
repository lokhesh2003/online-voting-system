import { ScreenShare, Users, Home, BarChart2, Box } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalVoters: 0, totalCandidates: 0, totalVotes: 0 });

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Could not fetch metrics", err));
  }, []);

  return (
    <div>
      <div className="page-header">
        <ScreenShare className="icon" size={20} /> ADMIN PANEL
      </div>

      <div className="panel" style={{ background: 'transparent', boxShadow: 'none' }}>
        <div className="panel-header" style={{ background: 'white', borderBottom: '1px solid #eee' }}>
          <h2><Home size={18} /> Admin</h2>
        </div>

        <div className="cards-grid">
          <div className="stat-card card-blue">
            <div className="info">
              <h3>{stats.totalVoters}</h3>
              <p>VOTERS</p>
            </div>
            <div className="icon-wrapper"><Users /></div>
          </div>
          
          <div className="stat-card card-green">
            <div className="info">
              <h3>{stats.totalCandidates}</h3>
              <p>CANDIDATES</p>
            </div>
            <div className="icon-wrapper"><Box size={48} /></div>
          </div>
          
          <div className="stat-card card-gold">
            <div className="info">
              <h3>{stats.totalVotes}</h3>
              <p>RESULTS (VOTES)</p>
            </div>
            <div className="icon-wrapper"><BarChart2 /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
