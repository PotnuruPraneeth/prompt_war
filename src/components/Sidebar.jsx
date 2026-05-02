import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, MessageSquare, Users, Settings, Hexagon } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Team', path: '/team', icon: Users },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <Hexagon className="brand-icon" size={32} />
        <h2>NexusTeam</h2>
      </div>
      
      <nav className="nav-links">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="nav-links" style={{ flex: 'none', marginTop: 'auto' }}>
        <a href="#" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
