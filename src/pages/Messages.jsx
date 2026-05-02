import React, { useState, useRef, useEffect } from 'react';
import { Send, Hash, MoreVertical, Phone } from 'lucide-react';
import { useData } from '../context/DataContext';
import './Messages.css';

const initialChannelData = {
  'general': {
    name: 'general',
    description: 'Company-wide announcements and work-based matters',
    messages: [
      { id: 1, user: 'Sarah Jenkins', initials: 'SJ', time: '10:42 AM', text: 'Hey team! The new design system is now live on Figma. Let me know if you have any feedback.', isMe: false },
      { id: 2, user: 'John Doe', initials: 'JD', time: '10:45 AM', text: "Looks amazing! I'll start implementing the new tokens in our CSS today.", isMe: true }
    ]
  },
  'design-team': {
    name: 'design-team',
    description: 'Design discussions and reviews',
    messages: [
      { id: 1, user: 'Sarah Jenkins', initials: 'SJ', time: '9:00 AM', text: 'Please review the new logo drafts.', isMe: false }
    ]
  },
  'engineering': {
    name: 'engineering',
    description: 'Tech talk and deployment updates',
    messages: [
      { id: 1, user: 'Elena Rodriguez', initials: 'ER', time: '11:20 AM', text: 'Server deployment successful! 🎉', isMe: false }
    ]
  }
};

const Messages = () => {
  const { teamMembers } = useData();
  const [activeChannel, setActiveChannel] = useState('general');
  const [channels, setChannels] = useState(() => {
    const saved = localStorage.getItem('nexus_messages');
    return saved ? JSON.parse(saved) : initialChannelData;
  });
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('nexus_messages', JSON.stringify(channels));
  }, [channels]);

  // Determine active data based on whether it's a standard channel or a DM
  let activeData;
  if (channels[activeChannel]) {
    activeData = channels[activeChannel];
  } else {
    // If it's not a standard channel, it's a DM. Find the user.
    const memberId = parseInt(activeChannel.replace('dm-', ''));
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      activeData = {
        isDM: true,
        name: member.name,
        description: `Phone: ${member.phone} • Role: ${member.role}`,
        messages: []
      };
    } else {
      activeData = channels['general'];
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channels, activeChannel]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: 'John Doe',
      initials: 'JD',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputValue,
      isMe: true
    };

    setChannels(prev => {
      // If the channel doesn't exist yet (like a new DM), create it
      const currentMessages = prev[activeChannel] ? prev[activeChannel].messages : [];
      const channelInfo = prev[activeChannel] || {
        name: activeData.name,
        description: activeData.description,
      };

      return {
        ...prev,
        [activeChannel]: {
          ...channelInfo,
          messages: [...currentMessages, newMessage]
        }
      };
    });
    
    setInputValue('');
  };

  return (
    <div className="messages-container animate-fade-in glass-panel">
      <div className="channels-sidebar">
        <h3>Channels</h3>
        <ul className="channel-list">
          {Object.keys(initialChannelData).map(ch => (
            <li 
              key={ch} 
              className={activeChannel === ch ? 'active' : ''}
              onClick={() => setActiveChannel(ch)}
            >
              <Hash size={16} /> {ch}
            </li>
          ))}
        </ul>
        
        <h3 style={{ marginTop: '2rem' }}>Direct Messages</h3>
        <ul className="dm-list">
          {teamMembers.filter(m => m.name !== 'John Doe').map(member => (
            <li 
              key={member.id}
              className={activeChannel === `dm-${member.id}` ? 'active' : ''}
              onClick={() => setActiveChannel(`dm-${member.id}`)}
              style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '4px' }}
            >
              <div className={`status-dot ${member.status}`}></div>
              {member.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <div className="channel-info">
            <h2>
              {activeData.isDM ? <div className="status-dot online" style={{display: 'inline-block', marginRight: '8px'}}></div> : <Hash size={20} />}
              {activeData.name}
            </h2>
            <p className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {activeData.isDM && <Phone size={14} />} {activeData.description}
            </p>
          </div>
          <button className="icon-btn"><MoreVertical size={20} /></button>
        </div>

        <div className="chat-history">
          {activeData.messages.map((msg) => (
            <div key={msg.id} className="message-item">
              <div className="avatar">{msg.initials}</div>
              <div className="message-content">
                <div className="message-meta">
                  <strong>{msg.user}</strong>
                  <span className="time">{msg.time}</span>
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {activeData.messages.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
              No messages yet. Start the conversation!
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <form className="input-wrapper" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder={`Message ${activeData.isDM ? '' : '#'}${activeData.name}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn-send"><Send size={18} /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
