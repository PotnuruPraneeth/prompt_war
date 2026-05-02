import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Messages from './pages/Messages';
import Team from './pages/Team';
import './App.css'; // Just keeping it for component specific, will create or overwrite it

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
