import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MoreHorizontal, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useData } from '../context/DataContext';
import './Team.css';

const Team = () => {
  const { teamMembers, handleAddMember } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '', email: '', phone: '', color: '#8B5CF6' });

  const submitMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) {
      toast.error('Name and Role are required');
      return;
    }

    handleAddMember(newMember);
    setIsModalOpen(false);
    setNewMember({ name: '', role: '', email: '', phone: '', color: '#8B5CF6' });
  };

  return (
    <div className="team-container animate-fade-in">
      <div className="team-header">
        <div>
          <h1>Team Directory</h1>
          <p className="text-muted">Manage your team members and their roles.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add Member
        </button>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card glass-panel">
            <div className="card-header">
              <div className="status-indicator">
                <span className={`status-dot ${member.status}`}></span>
                <span className="status-text">{member.status}</span>
              </div>
              <button className="icon-btn" onClick={() => toast('More options coming soon', { icon: '⚙️' })}>
                <MoreHorizontal size={18} />
              </button>
            </div>
            
            <div className="member-info">
              <div 
                className="member-avatar" 
                style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}80)` }}
              >
                {member.avatar}
              </div>
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
            </div>

            <div className="member-contact">
              <div className="contact-item">
                <Mail size={16} />
                <span>{member.email}</span>
              </div>
            </div>

            <div className="member-actions">
              <button 
                className="btn-secondary small"
                onClick={() => toast.success(`Started a chat with ${member.name}`, { icon: '💬' })}
              >
                <MessageSquare size={16} /> Message
              </button>
              <button 
                className="btn-secondary small"
                onClick={() => toast(`Calling ${member.name}...`, { icon: '📞' })}
              >
                <Phone size={16} /> Call
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <div className="modal-header">
              <h2>Add Team Member</h2>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitMember}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={newMember.name} 
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  placeholder="e.g., Jane Smith"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input 
                  type="text" 
                  value={newMember.role} 
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div className="form-group">
                <label>Email (Optional)</label>
                <input 
                  type="text" 
                  value={newMember.email} 
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  placeholder="jane.s@nexusteam.com"
                />
              </div>
              <div className="form-group">
                <label>Phone Number (Optional)</label>
                <input 
                  type="text" 
                  value={newMember.phone} 
                  onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                  placeholder="e.g., 555-0199"
                />
              </div>
              <div className="form-group">
                <label>Profile Color</label>
                <input 
                  type="color" 
                  value={newMember.color} 
                  onChange={(e) => setNewMember({...newMember, color: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
