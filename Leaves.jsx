
import React from 'react'
import { api } from '../lib/api'

export default function Leaves(){
  const [rows, setRows] = React.useState([])
  const [form, setForm] = React.useState({ employeeId:1, leaveType:'Sick Leave', startDate:new Date().toISOString().slice(0,10), endDate:new Date().toISOString().slice(0,10), reason:'' })
  async function load(){ setRows(await api('/api/leaves')) }
  React.useEffect(()=>{ load() }, [])
  async function add(){
    await api('/api/leaves', { method:'POST', body: form })
    await load()
  }
  return (
    <div style={{ padding: 24, fontFamily:'system-ui' }}>
      <h3>Leaves</h3>
      <div>
        <input placeholder="Emp ID" value={form.employeeId} onChange={e=>setForm({...form, employeeId:Number(e.target.value)})} style={{ width:80 }}/>
        <input placeholder="Type" value={form.leaveType} onChange={e=>setForm({...form, leaveType:e.target.value})}/>
        <input placeholder="Start" value={form.startDate} onChange={e=>setForm({...form, startDate:e.target.value})}/>
        <input placeholder="End" value={form.endDate} onChange={e=>setForm({...form, endDate:e.target.value})}/>
        <input placeholder="Reason" value={form.reason} onChange={e=>setForm({...form, reason:e.target.value})}/>
        <button onClick={add}>Apply</button>
      </div>
      <table border="1" cellPadding="6" style={{ marginTop: 12 }}>
        <thead><tr><th>ID</th><th>Emp</th><th>Type</th><th>Start</th><th>End</th><th>Status</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.employeeId}</td>
              <td>{r.leaveType}</td>
              <td>{r.startDate}</td>
              <td>{r.endDate}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
