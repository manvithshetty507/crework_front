// src/components/TaskManager.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import TaskModal from '../components/TaskModal';
import TaskBoard from '../components/TaskBoard';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import styles from '../styles/TaskManger.module.css'; 

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('https://crework-api.vercel.app/api/task', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTasks(response.data); 
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error during GET request:', error);
        setError('Failed to fetch tasks.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleTaskUpdate = async (taskId, fromStatus, toStatus, newIndex) => {
    const updatedTask = tasks.find(task => task._id === taskId);
  
    if (!updatedTask) return;
  
    // Update the task status and index locally
    const updatedTasks = tasks.map(task => 
      task._id === taskId ? { ...task, status: toStatus } : task
    );
    setTasks(updatedTasks);
  
    // Update the task order in the backend
    try {
      await axios.put(`https://crework-api.vercel.app/api/task/${taskId}`, {
        status: toStatus,
        index: newIndex
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.error('Error updating task:', error);
      // Rollback local changes if the update fails
      setTasks(tasks);
    }
  };
  

  const handleCreateTask = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.mainContent}>
        <Header username="John Doe" /> {/* Replace with actual username */}
        
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <>
            <button
              onClick={handleCreateTask}
              className={styles.button}
            >
              Create Task
            </button>
            <TaskBoard tasks={tasks} onTaskUpdate={handleTaskUpdate} />
          </>
        )}
        
        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setCurrentTasks={setTasks}/>
      </div>
    </div>
  );
};

export default TaskManager;
