
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Employees from './pages/Employees.jsx'
import Attendance from './pages/Attendance.jsx'
import Leaves from './pages/Leaves.jsx'

function App(){
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={(t)=>{localStorage.setItem('token',t); setToken(t)}}/>} />
        <Route path="/" element={token ? <Dashboard/> : <Navigate to="/login" />} />
        <Route path="/employees" element={token ? <Employees/> : <Navigate to="/login" />} />
        <Route path="/attendance" element={token ? <Attendance/> : <Navigate to="/login" />} />
        <Route path="/leaves" element={token ? <Leaves/> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
