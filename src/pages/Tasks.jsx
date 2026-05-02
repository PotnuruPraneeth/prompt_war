import React, { useState } from 'react';
import { MoreHorizontal, Plus, X } from 'lucide-react';
import './Tasks.css';

const initialColumns = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: 1, title: 'Design landing page', tag: 'Design', tagColor: '#8B5CF6' },
      { id: 2, title: 'Create user flow', tag: 'UX', tagColor: '#06B6D4' },
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { id: 3, title: 'Develop backend API', tag: 'Dev', tagColor: '#10B981' },
    ]
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      { id: 4, title: 'Dashboard components', tag: 'Frontend', tagColor: '#F59E0B' },
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 5, title: 'Setup project repository', tag: 'DevOps', tagColor: '#EF4444' },
    ]
  }
];

const Tasks = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', tag: 'Task', tagColor: '#8B5CF6', columnId: 'todo' });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const taskItem = {
      id: Date.now(),
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

    setNewTask({ title: '', tag: 'Task', tagColor: '#8B5CF6', columnId: 'todo' });
    setIsModalOpen(false);
  };

  return (
    <div className="tasks-board animate-fade-in">
      <div className="board-header">
        <h1>Task Board</h1>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          New Task
        </button>
      </div>

      <div className="kanban-container">
        {columns.map((col) => (
          <div key={col.id} className="kanban-column glass-panel">
            <div className="column-header">
              <h3>{col.title} <span>{col.tasks.length}</span></h3>
              <button className="icon-btn"><MoreHorizontal size={18} /></button>
            </div>
            
            <div className="task-list">
              {col.tasks.map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-tag" style={{ backgroundColor: `${task.tagColor}20`, color: task.tagColor }}>
                    {task.tag}
                  </div>
                  <h4>{task.title}</h4>
                  <div className="task-footer">
                    <div className="avatar small">JD</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <div className="modal-header">
              <h2>Add New Task</h2>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label>Task Title</label>
                <input 
                  type="text" 
                  value={newTask.title} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="e.g., Fix navigation bug"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Tag Name</label>
                <input 
                  type="text" 
                  value={newTask.tag} 
                  onChange={(e) => setNewTask({...newTask, tag: e.target.value})}
                  placeholder="e.g., Bug"
                />
              </div>
              <div className="form-group">
                <label>Tag Color</label>
                <input 
                  type="color" 
                  value={newTask.tagColor} 
                  onChange={(e) => setNewTask({...newTask, tagColor: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Column</label>
                <select 
                  value={newTask.columnId}
                  onChange={(e) => setNewTask({...newTask, columnId: e.target.value})}
                >
                  {columns.map(col => (
                    <option key={col.id} value={col.id}>{col.title}</option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
