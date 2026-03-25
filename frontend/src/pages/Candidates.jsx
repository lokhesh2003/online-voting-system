import { ScreenShare, Users, Box, Mail, Edit3, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Candidates() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', party: '', city: '', mobileNo: '', email: '', photoBase64: '' });

  const fetchCandidates = () => {
    axios.get("http://localhost:8080/api/vote/candidates")
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching candidates:", err));
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoBase64: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Edit
      axios.put(`http://localhost:8080/api/admin/candidates/${formData.id}`, formData)
        .then(() => {
          fetchCandidates();
          setShowForm(false);
        })
        .catch(err => console.error(err));
    } else {
      // Add
      axios.post("http://localhost:8080/api/admin/candidates", formData)
        .then(() => {
          fetchCandidates();
          setShowForm(false);
        })
        .catch(err => console.error(err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      axios.delete(`http://localhost:8080/api/admin/candidates/${id}`)
        .then(() => fetchCandidates())
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (candidate) => {
    setFormData(candidate);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', party: '', city: '', mobileNo: '', email: '', photoBase64: '' });
    setShowForm(false);
  };

  return (
    <div>
      <div className="page-header">
        <ScreenShare className="icon" size={20} /> ADMIN PANEL
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2><Users size={18} /> Candidate</h2>
        </div>
        
        <div style={{ padding: '15px 20px' }}>
          {!showForm && (
             <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary" style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: '#3498db', color: 'white' }}>Create New</button>
          )}
        </div>

        {showForm && (
          <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
              <input type="text" placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required className="input-field" style={{ padding: '8px' }}/>
              <input type="text" placeholder="Party" value={formData.party || ''} onChange={e => setFormData({...formData, party: e.target.value})} className="input-field" style={{ padding: '8px' }}/>
              <input type="text" placeholder="City" value={formData.city || ''} onChange={e => setFormData({...formData, city: e.target.value})} className="input-field" style={{ padding: '8px' }}/>
              <input type="text" placeholder="Mobile No" value={formData.mobileNo || ''} onChange={e => setFormData({...formData, mobileNo: e.target.value})} className="input-field" style={{ padding: '8px' }}/>
              <input type="email" placeholder="Email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="input-field" style={{ padding: '8px' }}/>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
              {formData.photoBase64 && <img src={formData.photoBase64} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ padding: '8px 16px', background: 'var(--color-widget-green)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{formData.id ? 'Update' : 'Save'}</button>
                <button type="button" onClick={resetForm} style={{ padding: '8px 16px', background: '#e2e8f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>MobileNo</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.city}</td>
                <td>{c.mobileNo}</td>
                <td>{c.email}</td>
                <td>
                  {c.photoBase64 ? (
                    <img src={c.photoBase64} alt={c.name} className="avatar" style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px'}} />
                  ) : (
                    <img src={`https://ui-avatars.com/api/?name=${c.name}&background=random`} alt={c.name} className="avatar" style={{width: '40px', height: '40px', borderRadius: '4px'}} />
                  )}
                </td>
                <td className="action-links">
                  <a href="#" onClick={(e) => { e.preventDefault(); handleEdit(c); }}>Edit</a> | <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(c.id); }}>Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
