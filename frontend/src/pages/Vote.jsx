import { useState, useEffect } from 'react';
import axios from 'axios';
import { ScreenShare, CheckSquare } from 'lucide-react';

export default function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [userId, setUserId] = useState(1); // Default to 1

  const fetchCandidates = () => {
    axios.get("http://localhost:8080/api/vote/candidates")
      .then(res => setCandidates(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleVote = (candidateId) => {
    if(!userId) {
      alert("Please enter your Voter ID");
      return;
    }
    axios.post(`http://localhost:8080/api/vote/${userId}/${candidateId}`)
      .then(res => {
        alert(res.data);
        fetchCandidates(); // Refresh to see updated vote counts (if shown)
      })
      .catch(err => {
        console.error(err);
        alert("Failed to submit vote. Is the backend running?");
      });
  };

  return (
    <div>
      <div className="page-header">
        <ScreenShare className="icon" size={20} /> USER DASHBOARD
      </div>

      <div className="panel" style={{ maxWidth: '600px', margin: '20px auto' }}>
        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2><CheckSquare size={18} /> Cast Your Vote</h2>
          <div>
            <label style={{ fontSize: '13px', marginRight: '5px' }}>Your Voter ID:</label>
            <input 
              type="number" 
              value={userId} 
              onChange={e => setUserId(e.target.value)}
              style={{ padding: '4px', width: '60px', borderRadius: '4px', border: '1px solid #ccc' }} 
            />
          </div>
        </div>
        
        <div style={{ padding: '20px' }}>
          {candidates.length === 0 ? <p>No candidates found...</p> : null}
          {candidates.map(c => (
            <div key={c.id} style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '15px',
              border: '1px solid #eee',
              borderRadius: '8px',
              marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {c.photoBase64 ? (
                  <img src={c.photoBase64} alt={c.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  <img src={`https://ui-avatars.com/api/?name=${c.name}&background=random`} alt={c.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                )}
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>{c.name}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{c.party || 'Independent'}</p>
                </div>
              </div>
              <button className="btn-primary" onClick={() => handleVote(c.id)}>
                Vote
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
