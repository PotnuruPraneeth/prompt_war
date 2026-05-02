import React from 'react';
import { Mail, MessageSquare, Phone, MoreHorizontal } from 'lucide-react';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Project Manager',
      email: 'john.doe@nexusteam.com',
      avatar: 'JD',
      color: '#8B5CF6',
      status: 'online'
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      role: 'Lead Designer',
      email: 'sarah.j@nexusteam.com',
      avatar: 'SJ',
      color: '#EC4899',
      status: 'online'
    },
    {
      id: 3,
      name: 'Mike Chen',
      role: 'Frontend Developer',
      email: 'mike.chen@nexusteam.com',
      avatar: 'MC',
      color: '#06B6D4',
      status: 'offline'
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      role: 'Backend Developer',
      email: 'elena.r@nexusteam.com',
      avatar: 'ER',
      color: '#10B981',
      status: 'online'
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'DevOps Engineer',
      email: 'david.k@nexusteam.com',
      avatar: 'DK',
      color: '#F59E0B',
      status: 'busy'
    },
    {
      id: 6,
      name: 'Amanda Brooks',
      role: 'UX Researcher',
      email: 'amanda.b@nexusteam.com',
      avatar: 'AB',
      color: '#6366F1',
      status: 'offline'
    }
  ];

  return (
    <div className="team-container animate-fade-in">
      <div className="team-header">
        <div>
          <h1>Team Directory</h1>
          <p className="text-muted">Manage your team members and their roles.</p>
        </div>
        <button className="btn-primary">Add Member</button>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card glass-panel">
            <div className="card-header">
              <div className="status-indicator">
                <span className={`status-dot ${member.status}`}></span>
                <span className="status-text">{member.status}</span>
              </div>
              <button className="icon-btn"><MoreHorizontal size={18} /></button>
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
              <button className="btn-secondary small">
                <MessageSquare size={16} /> Message
              </button>
              <button className="btn-secondary small">
                <Phone size={16} /> Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
