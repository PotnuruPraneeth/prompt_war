import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const initialColumns = [
  { id: 'todo', title: 'To Do', tasks: [
    { id: '1', title: 'Design landing page', tag: 'Design', tagColor: '#8B5CF6' },
    { id: '2', title: 'Create user flow', tag: 'UX', tagColor: '#06B6D4' }
  ]},
  { id: 'in-progress', title: 'In Progress', tasks: [
    { id: '3', title: 'Develop backend API', tag: 'Dev', tagColor: '#10B981' }
  ]},
  { id: 'review', title: 'Review', tasks: [
    { id: '4', title: 'Dashboard components', tag: 'Frontend', tagColor: '#F59E0B' }
  ]},
  { id: 'done', title: 'Done', tasks: [
    { id: '5', title: 'Setup project repository', tag: 'DevOps', tagColor: '#EF4444' }
  ]}
];

const initialTeam = [
  { id: 1, name: 'John Doe', role: 'Project Manager', email: 'john.doe@nexusteam.com', phone: '555-0101', avatar: 'JD', color: '#8B5CF6', status: 'online' },
  { id: 2, name: 'Sarah Jenkins', role: 'Lead Designer', email: 'sarah.j@nexusteam.com', phone: '555-0102', avatar: 'SJ', color: '#EC4899', status: 'online' },
  { id: 3, name: 'Mike Chen', role: 'Frontend Developer', email: 'mike.chen@nexusteam.com', phone: '555-0103', avatar: 'MC', color: '#06B6D4', status: 'offline' },
  { id: 4, name: 'Elena Rodriguez', role: 'Backend Developer', email: 'elena.r@nexusteam.com', phone: '555-0104', avatar: 'ER', color: '#10B981', status: 'online' },
];

export const DataProvider = ({ children }) => {
  // Initialize state from localStorage or fallback to defaults
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('nexus_columns');
    return saved ? JSON.parse(saved) : initialColumns;
  });

  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem('nexus_team');
    return saved ? JSON.parse(saved) : initialTeam;
  });

  const [recentActivity, setRecentActivity] = useState(() => {
    const saved = localStorage.getItem('nexus_activity');
    return saved ? JSON.parse(saved) : [
      { id: 1, user: 'System', action: 'Project workspace initialized', time: '1 day ago' }
    ];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('nexus_columns', JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem('nexus_team', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('nexus_activity', JSON.stringify(recentActivity));
  }, [recentActivity]);

  const addActivity = (user, action) => {
    const newActivity = {
      id: Date.now(),
      user,
      action,
      time: 'Just now'
    };
    setRecentActivity(prev => [newActivity, ...prev].slice(0, 5)); // Keep last 5
  };

  const moveTask = (taskId, toColumnId) => {
    let fromColumnId;
    let taskToMove;

    columns.forEach(col => {
      const task = col.tasks.find(t => t.id === taskId);
      if (task) {
        fromColumnId = col.id;
        taskToMove = task;
      }
    });

    if (fromColumnId === toColumnId || !taskToMove) return;

    setColumns(prev => prev.map(col => {
      if (col.id === fromColumnId) {
        return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
      }
      if (col.id === toColumnId) {
        return { ...col, tasks: [...col.tasks, taskToMove] };
      }
      return col;
    }));
    
    addActivity('John Doe', `Moved task "${taskToMove.title}" to ${columns.find(c=>c.id === toColumnId)?.title || toColumnId}`);
  };

  const handleAddTask = (newTask) => {
    const taskItem = {
      id: Date.now().toString(),
      title: newTask.title,
      tag: newTask.tag,
      tagColor: newTask.tagColor
    };

    setColumns(columns.map(col => {
      if (col.id === newTask.columnId) {
        return { ...col, tasks: [...col.tasks, taskItem] };
      }
      return col;
    }));
    
    addActivity('John Doe', `Created new task "${taskItem.title}"`);
    toast.success('Task created successfully');
  };

  const handleAddMember = (newMember) => {
    const initials = newMember.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const member = {
      id: Date.now(),
      name: newMember.name,
      role: newMember.role,
      email: newMember.email || `${newMember.name.split(' ')[0].toLowerCase()}@nexusteam.com`,
      phone: newMember.phone || 'N/A',
      avatar: initials,
      color: newMember.color,
      status: 'online'
    };

    setTeamMembers([...teamMembers, member]);
    addActivity('John Doe', `Added new team member ${member.name}`);
    toast.success(`${member.name} added to the team!`);
  };

  return (
    <DataContext.Provider value={{
      columns,
      teamMembers,
      recentActivity,
      moveTask,
      handleAddTask,
      handleAddMember
    }}>
      {children}
    </DataContext.Provider>
  );
};
