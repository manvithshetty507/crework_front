// src/components/TaskBoard.jsx
import React, { useState } from 'react';
import TaskColumn from './TaskColumn';

const TaskBoard = ({ tasks = [], onTaskUpdate }) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFromStatus, setDraggedFromStatus] = useState(null);

  const handleDragStart = (e, taskId, index, status) => {
    e.dataTransfer.setData('text/plain', taskId); // Store task ID
    setDraggedTask({ taskId, index });
    setDraggedFromStatus(status);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    const droppedIndex = Array.from(e.currentTarget.children).indexOf(e.target);

    // Update tasks based on drop
    console.log(taskId, draggedFromStatus, status, droppedIndex);
    onTaskUpdate(taskId, draggedFromStatus, status, droppedIndex);

    setDraggedTask(null);
    setDraggedFromStatus(null);
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div style={{ display: 'flex',width:'100%',margin:'0px',padding:'0', overflowX: 'auto' }}>
      {['To-Do', 'In Progress', 'Under Review', 'Completed'].map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasks.filter(task => task.status === status)}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onTaskCreated={handleTaskCreated}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
