import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignupPage from './pages/LoginSignupPage';
import TaskManager from './pages/TaskManager';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginSignupPage />}/>
          <Route path='/home' element={<TaskManager />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App