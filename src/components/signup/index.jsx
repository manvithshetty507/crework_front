import React, { useState } from 'react';
import styles from '../../styles/Signup.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = ({ setIsSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://crework-api.vercel.app/api/auth/register', {
        email,
        password,
      });

      // Check if the response contains a token
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Signup successful, token stored in local storage');
        localStorage.setItem('emailId', email);
        navigate('/home');
      } else {
        setError('Failed to sign up');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred during signup');
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
            value={password}
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Sign Up</button>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.loginLink} onClick={() => setIsSignup(false)}>
          Already have an account? <a>Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
