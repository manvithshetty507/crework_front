import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TaskModal.module.css'; 

const TaskModal = ({ isOpen, onClose, setCurrentTasks }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To-Do',
    priority: 'Medium',
    deadline: '',
  });
  const [customProperties, setCustomProperties] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    try {
      await axios.post('https://crework-api.vercel.app/api/task', { ...task }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCurrentTasks(prev => [...prev, task]);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const addCustomProperty = () => {
    setCustomProperties([...customProperties, { key: '', value: '' }]);
  };

  const handlePropertyChange = (index, field, value) => {
    const updatedProperties = customProperties.map((prop, i) => (
      i === index ? { ...prop, [field]: value } : prop
    ));
    setCustomProperties(updatedProperties);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.modalTitle}>Add New Task</h2>
          <div className={styles.field}>
            <input
              type="text"
              placeholder="Title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Status</label>
            <select
              value={task.status}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Completed">Completed</option>
              Under Review
            </select>
          </div>
          <div className={styles.field}>
            <label>Priority</label>
            <select
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Deadline</label>
            <input
              type="date"
              value={task.deadline}
              onChange={(e) => setTask({ ...task, deadline: e.target.value })}
              required
            />
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <textarea
              placeholder="Description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              required
            />
          </div>
          <div className={styles.customProperties}>
            <label>Custom Properties</label>
            {/* {customProperties.map((prop, index) => (
              <div key={index} className={styles.customProperty}>
                <input
                  type="text"
                  placeholder="Key"
                  value={prop.key}
                  onChange={(e) => handlePropertyChange(index, 'key', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={prop.value}
                  onChange={(e) => handlePropertyChange(index, 'value', e.target.value)}
                />
              </div>
            ))} */}
            <button type="button" className={styles.addButton} onClick={addCustomProperty}>
              <span className={styles.addIcon}>+</span> Add Property
            </button>
          </div>
          <button type="submit" className={styles.submitButton}>Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
