// src/components/Header.js
import React from 'react';

const Header = ({ username }) => (
  <div style={{
    padding: '20px',
    backgroundColor: '#F7F7F7',
    color: '#000',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin:'0px',
  }}>
    <h1>Good Morning, {localStorage.getItem('emailId')?.split('@')[0] || "user"}</h1>
    <p style={{
      margin: 0,
      display: 'flex',
      gap: '15px',
      fontSize: '16px',
    }}>
      <a href="/help" style={{
        color: '#007bff',
        textDecoration: 'none',
      }}>Help</a>
      <a href="/feedback" style={{
        color: '#007bff',
        textDecoration: 'none',
      }}>Feedback</a>
    </p>
  </div>
);

export default Header;
