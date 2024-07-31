import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://crework-api.vercel.app/api/auth/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful, token stored in local storage');
        localStorage.setItem('emailId', email);
        navigate('/home');
      } else {
        setError('Failed to login');
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      setError('An error occurred during login');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.header}>
          <span className={styles.welcome}>Welcome to </span>
          <span className={styles.workflo}>Workflo</span>
        </h1>
        <div className={styles.inputGroup}>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            id="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Login</button>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.signupLink} onClick={() => setIsSignup(true)}>
          Don't have an account? create new <a>account</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
