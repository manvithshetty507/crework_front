// src/components/TaskColumn.jsx
import React from 'react';
import styles from '../styles/TaskColumn.module.css';
import { FaRegClock } from 'react-icons/fa'; // Import timer icon

const TaskColumn = ({ status, tasks, onDragStart, onDrop }) => (
  <div
    id={status}
    onDragOver={(e) => e.preventDefault()}  // Allow dropping
    onDrop={(e) => onDrop(e, status)}     // Handle drop
    className={styles.column}  // Apply CSS module style
  >
    <h3 className={styles.header}>{status}</h3>
    {tasks.map((task, index) => (
      <div
        key={task._id}
        draggable
        onDragStart={(e) => onDragStart(e, task._id, index, status)}  // Handle drag start
        className={styles.task}  // Apply CSS module style
      >
        <div className={styles.taskContent}>
          <div className={styles.taskDetails}>
            <h4 className={styles.taskTitle}>{task.title}</h4>
            <p className={styles.taskDescription}>{task.description}</p>
          </div>
          <div className={styles.iconContainer}>
            <span
              className={`${styles[`priority${task.priority}`]}`} 
              style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}
            >
              {task.priority}
            </span>
            <p style={{display:'flex'}}>
              <FaRegClock className={styles.timerIcon} /> {/* Timer icon */}
              <span className={styles.deadline}>{new Date(task.deadline).toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default TaskColumn;
