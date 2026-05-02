import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import './AIChatBot.css';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your Nexus AI Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const generateAIResponse = async (userMessage) => {
    const API_KEY = import.meta.env.VITE_AI_API_KEY;
    if (!API_KEY) {
      return "Error: API key is missing. Please set VITE_AI_API_KEY in your .env.local file.";
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `You are a helpful AI assistant for a team collaboration app called NexusTeam. Keep responses concise and helpful. User asks: ${userMessage}` }]
              }
            ]
          })
        }
      );

      const data = await response.json();
      
      if (data.error) {
        return `API Error: ${data.error.message}`;
      }

      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
      }
      return "Sorry, I couldn't generate a response.";
    } catch (error) {
      return "Sorry, there was an error connecting to the AI service.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const newUserMessage = { id: Date.now(), text: userText, isBot: false };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await generateAIResponse(userText);
    
    const botMessage = { id: Date.now() + 1, text: aiResponseText, isBot: true };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="ai-chatbot-container">
      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window glass-panel animate-fade-in">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <Bot size={20} className="ai-icon" />
              <h3>Nexus AI</h3>
            </div>
            <button className="icon-btn" onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>
          
          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.isBot && <div className="ai-avatar"><Bot size={14} /></div>}
                <div className={`ai-message ${msg.isBot ? 'bot-msg' : 'user-msg'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="ai-message-wrapper bot">
                <div className="ai-avatar"><Bot size={14} /></div>
                <div className="ai-message bot-msg typing-indicator">
                  <Loader2 size={16} className="spin" /> Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-chat-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="btn-send-ai">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button className="ai-fab-btn" onClick={toggleChat} title="Open AI Assistant">
          <Bot size={24} />
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
