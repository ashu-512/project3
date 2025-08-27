
import React from 'react'
import { api } from '../lib/api'

export default function Attendance(){
  const [employeeId, setEmployeeId] = React.useState('1')
  const [rows, setRows] = React.useState([])
  const [form, setForm] = React.useState({ employeeId:1, date:new Date().toISOString().slice(0,10), clockIn:'09:00:00', clockOut:'18:00:00' })
  async function load(){
    if(!employeeId) return
    setRows(await api('/api/attendance/'+employeeId))
  }
  React.useEffect(()=>{ load() }, [employeeId])
  async function add(){
    await api('/api/attendance', { method:'POST', body: form })
    await load()
  }
  return (
    <div style={{ padding: 24, fontFamily:'system-ui' }}>
      <h3>Attendance</h3>
      <div>
        <label>Employee ID:</label>
        <input value={employeeId} onChange={e=>setEmployeeId(e.target.value)} style={{ width:80 }}/>
      </div>
      <div style={{ marginTop:8 }}>
        <input placeholder="Date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
        <input placeholder="In" value={form.clockIn} onChange={e=>setForm({...form, clockIn:e.target.value})}/>
        <input placeholder="Out" value={form.clockOut} onChange={e=>setForm({...form, clockOut:e.target.value})}/>
        <button onClick={add}>Add</button>
      </div>
      <table border="1" cellPadding="6" style={{ marginTop: 12 }}>
        <thead><tr><th>Date</th><th>In</th><th>Out</th><th>Status</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.clockIn}</td>
              <td>{r.clockOut}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
