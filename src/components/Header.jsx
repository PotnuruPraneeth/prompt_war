import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const Header = () => {
  return (
    <header className="header">
      <div className="header-search">
        <Search size={18} className="text-muted" />
        <input type="text" placeholder="Search tasks, messages, or files..." />
      </div>
      
      <div className="header-actions">
        <button className="icon-btn" onClick={() => toast.success('You have 3 new notifications')}>
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        
        <div 
          className="user-profile" 
          onClick={() => toast('Profile menu coming soon', { icon: '👤' })}
          style={{ cursor: 'pointer' }}
        >
          <div className="avatar">JD</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>John Doe</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Project Manager</span>
          </div>
          <ChevronDown size={16} className="text-muted" style={{ marginLeft: '0.5rem' }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
