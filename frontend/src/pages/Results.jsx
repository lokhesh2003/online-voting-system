import { BarChart2, Layers, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Results() {
  const [stats, setStats] = useState({
    participation: "0",
    totalVoters: 0,
    votedCount: 0,
    totalCandidates: 0,
    votesByDate: {},
    winnerName: "Loading...",
    winnerVotes: 0
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/results-stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  const dates = Object.keys(stats.votesByDate || {}).sort();
  const counts = dates.map(d => stats.votesByDate[d]);

  const data = {
    labels: dates.length ? dates : ['No Data'],
    datasets: [
      {
        label: 'Ballots Submitted',
        fill: true,
        data: counts.length ? counts : [0],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div>
      <div className="page-header">
        <Layers className="icon" size={20} /> ELECTION RUNNER (Results)
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        
        {/* Chart Column */}
        <div className="panel" style={{ marginTop: 0, flex: '2', minWidth: '400px' }}>
          <div className="panel-header">
            <h2>Ballots Submitted By Date</h2>
          </div>
          <div style={{ padding: '20px', height: '300px' }}>
            <Line options={options} data={data} style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '10px' }}><BarChart2 size={16} /> Voting URLs</h3>
            <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '4px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', border: '1px solid #ddd' }}>
              <span>http://localhost:5173/vote</span>
              <button style={{ background: '#fff', border: '1px solid #ccc', padding: '2px 8px', borderRadius: '2px', cursor: 'pointer' }}>Copy</button>
            </div>
          </div>
        </div>

        {/* Sidebar Status Column */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '250px' }}>
          
          <div style={{ background: 'var(--color-widget-green)', color: 'white', padding: '20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ fontSize: '32px', margin: 0 }}>{stats.participation}%</h2>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>Participation ({stats.votedCount} Voters)</p>
            </div>
          </div>

          <div style={{ background: '#e67e22', color: 'white', padding: '20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👥</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ fontSize: '32px', margin: 0 }}>{stats.totalVoters}</h2>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>Total Registered Voters</p>
            </div>
          </div>

          <div style={{ background: '#e84393', color: 'white', padding: '20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trophy size={20} /></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ fontSize: '24px', margin: 0 }}>{stats.winnerName}</h2>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>Current Winner ({stats.winnerVotes} Votes)</p>
            </div>
          </div>

          <div style={{ background: '#6c5ce7', color: 'white', padding: '20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>≡</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ fontSize: '32px', margin: 0 }}>{stats.totalCandidates}</h2>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>Candidate Options</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
