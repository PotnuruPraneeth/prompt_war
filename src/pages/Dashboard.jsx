import React from 'react';
import { TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Total Tasks', value: '42', icon: CheckCircle, color: '#8B5CF6' },
    { title: 'In Progress', value: '12', icon: Clock, color: '#06B6D4' },
    { title: 'Team Members', value: '8', icon: Users, color: '#10B981' },
    { title: 'Productivity', value: '+14%', icon: TrendingUp, color: '#F59E0B' },
  ];

  return (
    <div className="dashboard animate-fade-in">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p className="text-muted">Welcome back, John. Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-panel stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="glass-panel recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-details">
                  <p><strong>Sarah</strong> completed task <em>"Update homepage design"</em></p>
                  <span className="time">2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-panel upcoming-deadlines">
          <h2>Upcoming Deadlines</h2>
          <div className="deadline-list">
            <div className="deadline-item">
              <div className="deadline-info">
                <h4>Q3 Marketing Plan</h4>
                <span>Due in 2 days</span>
              </div>
              <div className="status-badge urgent">Urgent</div>
            </div>
            <div className="deadline-item">
              <div className="deadline-info">
                <h4>Client Presentation</h4>
                <span>Due in 5 days</span>
              </div>
              <div className="status-badge normal">On Track</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
