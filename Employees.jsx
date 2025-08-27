
import React from 'react'
import { api } from '../lib/api'

export default function Employees(){
  const [rows, setRows] = React.useState([])
  const [form, setForm] = React.useState({ firstName:'', lastName:'', email:'' })
  async function load(){ setRows(await api('/api/employees')) }
  React.useEffect(()=>{ load() }, [])
  async function add(){
    await api('/api/employees', { method:'POST', body: form })
    setForm({ firstName:'', lastName:'', email:'' })
    await load()
  }
  return (
    <div style={{ padding: 24, fontFamily:'system-ui' }}>
      <h3>Employees</h3>
      <div>
        <input placeholder="First name" value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})}/>
        <input placeholder="Last name" value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})}/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <button onClick={add}>Add</button>
      </div>
      <table border="1" cellPadding="6" style={{ marginTop: 12 }}>
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Status</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.firstName} {r.lastName}</td>
              <td>{r.email}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
