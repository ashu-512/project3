
import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  return (
    <div style={{ padding: 24, fontFamily:'system-ui' }}>
      <h2>EMS Dashboard</h2>
      <ul>
        <li><Link to="/employees">Employees</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/leaves">Leaves</Link></li>
      </ul>
    </div>
  )
}
