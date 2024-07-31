import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaSun, FaArrowAltCircleLeft } from 'react-icons/fa';

const handleLogout = () => {
  localStorage.setItem('token',"");
  window.location.href = "/"
}
const SideBar = () => (
  <div style={{
    width: '15%',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    height: '100vh',
    borderRight: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    maxHeight:'100vh'
  }}>
    <div style={{ marginBottom: '20px' }}>
      <h3>Hello {localStorage.getItem('emailId')?.split('@')[0] || "user"}</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaBell style={{ marginRight: '10px', color: 'gray' }} />
        <FaSun style={{ marginRight: '10px', color: 'gray' }} />
        <FaArrowAltCircleLeft style={{ marginRight: '10px', color: 'gray' }} />
        <button style={{
          backgroundColor: 'inherit',
          color: 'gray',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 15px',
          cursor: 'pointer',
          fontSize: '16px',
          border:'1px solid gray'
        }}
        onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
    <nav>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/home" style={linkStyle}>Home</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/boards" style={linkStyle}>Boards</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/settings" style={linkStyle}>Settings</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/teams" style={linkStyle}>Teams</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/analytics" style={linkStyle}>Analytics</Link>
        </li>
      </ul>
    </nav>
    <Link style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}>
      <button style={{
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 15px',
        cursor: 'pointer',
        fontSize: '16px',
      }}>
        Create Task
      </button>
    </Link>
  </div>
);

const linkStyle = {
  color: '#333',
  backgroundColor: '#e4e4e4',
  padding: '10px 15px',
  borderRadius: '4px',
  textDecoration: 'none',
  display: 'block',
  fontSize: '16px',
};

export default SideBar;

