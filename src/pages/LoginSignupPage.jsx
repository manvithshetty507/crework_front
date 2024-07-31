import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPage from '../components/signup';
import LoginPage from '../components/login';
import axios from 'axios';

function LoginSignupPage() {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to check API status
    const checkApiStatus = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://crework-api.vercel.app/get', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          navigate('/home');
        }
      } catch (error) {
        console.error('API check failed:', error);
      }
    };

    checkApiStatus();
  }, [navigate]);

  return (
    <div>
      {isSignup ? 
        <SignupPage setIsSignup={setIsSignup} />
        : 
        <LoginPage setIsSignup={setIsSignup} />
      }
    </div>
  );
}

export default LoginSignupPage;
