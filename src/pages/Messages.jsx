import React, { useState, useRef, useEffect } from 'react';
import { Send, Hash, MoreVertical } from 'lucide-react';
import './Messages.css';

const initialMessages = [
  {
    id: 1,
    user: 'Sarah Jenkins',
    initials: 'SJ',
    time: '10:42 AM',
    text: 'Hey team! The new design system is now live on Figma. Let me know if you have any feedback.',
    isMe: false
  },
  {
    id: 2,
    user: 'John Doe',
    initials: 'JD',
    time: '10:45 AM',
    text: "Looks amazing! I'll start implementing the new tokens in our CSS today.",
    isMe: true
  }
];

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: 'John Doe', // Assume current user
      initials: 'JD',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputValue,
      isMe: true
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  return (
    <div className="messages-container animate-fade-in glass-panel">
      <div className="channels-sidebar">
        <h3>Channels</h3>
        <ul className="channel-list">
          <li className="active"><Hash size={16} /> general</li>
          <li><Hash size={16} /> design-team</li>
          <li><Hash size={16} /> engineering</li>
        </ul>
        
        <h3 style={{ marginTop: '2rem' }}>Direct Messages</h3>
        <ul className="dm-list">
          <li>
            <div className="status-dot online"></div>
            Sarah Jenkins
          </li>
          <li>
            <div className="status-dot offline"></div>
            Mike Chen
          </li>
        </ul>
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <div className="channel-info">
            <h2><Hash size={20} /> general</h2>
            <p className="text-muted">Company-wide announcements and work-based matters</p>
          </div>
          <button className="icon-btn"><MoreVertical size={20} /></button>
        </div>

        <div className="chat-history">
          {messages.map((msg) => (
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
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          <form className="input-wrapper" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Message #general..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
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
