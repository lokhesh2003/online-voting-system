import { ScreenShare, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Voters() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', email: '', password: '' });

  const fetchVoters = () => {
    axios.get("http://localhost:8080/api/admin/voters")
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching voters:", err));
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      axios.put(`http://localhost:8080/api/admin/voters/${formData.id}`, formData)
        .then(() => {
          fetchVoters();
          setShowForm(false);
        })
        .catch(err => console.error(err));
    } else {
      axios.post("http://localhost:8080/api/admin/voters", formData)
        .then(() => {
          fetchVoters();
          setShowForm(false);
        })
        .catch(err => console.error(err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this voter?")) {
      axios.delete(`http://localhost:8080/api/admin/voters/${id}`)
        .then(() => fetchVoters())
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (voter) => {
    setFormData({ id: voter.id, name: voter.name, email: voter.email, password: '' });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', email: '', password: '' });
    setShowForm(false);
  };

  return (
    <div>
      <div className="page-header">
        <ScreenShare className="icon" size={20} /> ADMIN PANEL
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2><Users size={18} /> Registered Voters</h2>
        </div>
        
        <div style={{ padding: '15px 20px' }}>
          {!showForm && (
             <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary" style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: '#3498db', color: 'white' }}>Register New Voter</button>
          )}
        </div>

        {showForm && (
          <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required className="input-field" style={{ padding: '8px' }}/>
              <input type="email" placeholder="Email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} required className="input-field" style={{ padding: '8px' }}/>
              <input type="password" placeholder="Password (leave empty to keep)" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="input-field" style={{ padding: '8px' }}/>
              <button type="submit" style={{ padding: '8px 16px', background: 'var(--color-widget-green)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{formData.id ? 'Update' : 'Save'}</button>
              <button type="button" onClick={resetForm} style={{ padding: '8px 16px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
            </form>
          </div>
        )}

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Voting Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(v => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px',
                    color: 'white',
                    background: v.hasVoted ? 'var(--color-widget-green)' : 'var(--color-widget-red)' 
                  }}>
                    {v.hasVoted ? 'Voted' : 'Pending'}
                  </span>
                </td>
                <td className="action-links">
                  <a href="#" onClick={(e) => { e.preventDefault(); handleEdit(v); }}>Edit</a> | <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(v.id); }}>Delete</a>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No voters found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
