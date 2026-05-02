import React, { useState } from 'react';
import { MoreHorizontal, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useData } from '../context/DataContext';
import './Tasks.css';

// Draggable Task Card
const TaskCard = ({ task, onDragStart }) => {
  return (
    <div 
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="task-tag" style={{ backgroundColor: `${task.tagColor}20`, color: task.tagColor }}>
        {task.tag}
      </div>
      <h4>{task.title}</h4>
      <div className="task-footer">
        <div className="avatar small">JD</div>
      </div>
    </div>
  );
};

// Droppable Column
const KanbanColumn = ({ column, onDrop, onDragOver }) => {
  return (
    <div 
      className="kanban-column glass-panel"
      onDrop={(e) => onDrop(e, column.id)}
      onDragOver={onDragOver}
    >
      <div className="column-header">
        <h3>{column.title} <span>{column.tasks.length}</span></h3>
        <button className="icon-btn" onClick={() => toast('Column settings', { icon: '⚙️' })}>
          <MoreHorizontal size={18} />
        </button>
      </div>
      
      <div className="task-list" style={{ minHeight: '300px' }}>
        {column.tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDragStart={onDragStart} 
          />
        ))}
      </div>
    </div>
  );
};

// Expose onDragStart function outside component scope for cleaner props passing
let draggedTaskId = null;
const onDragStart = (e, taskId) => {
  draggedTaskId = taskId;
  // This is required for Firefox to enable dragging
  e.dataTransfer.setData('text/plain', taskId);
  e.dataTransfer.effectAllowed = 'move';
};

const Tasks = () => {
  const { columns, moveTask, handleAddTask } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', tag: 'Task', tagColor: '#8B5CF6', columnId: 'todo' });

  const onDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e, columnId) => {
    e.preventDefault();
    if (draggedTaskId) {
      moveTask(draggedTaskId, columnId);
      draggedTaskId = null;
    }
  };

  const submitTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      toast.error('Task title is required');
      return;
    }
    handleAddTask(newTask);
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
          <KanbanColumn 
            key={col.id} 
            column={col} 
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
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
            <form onSubmit={submitTask}>
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
