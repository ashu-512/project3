
import React from 'react'
import { api } from '../lib/api'

export default function Login({ onLogin }){
  const [email, setEmail] = React.useState('admin@ems.com')
  const [password, setPassword] = React.useState('secret123')
  const [error, setError] = React.useState('')
  async function handleRegister(){
    try{
      await api('/api/auth/register', { method:'POST', body:{ name:'Admin', email, password, role:'Admin' }, token:null })
      setError('Registered. Now login.')
    }catch(e){ setError(e.message) }
  }
  async function handleLogin(e){
    e.preventDefault()
    try{
      const data = await api('/api/auth/login', { method:'POST', body:{ email, password }, token:null })
      onLogin(data.token)
    }catch(e){ setError(e.message) }
  }
  return (
    <div style={{ maxWidth: 400, margin:'5rem auto', fontFamily:'system-ui' }}>
      <h2>EMS Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} style={{ width:'100%', padding:8, marginBottom:8 }}/>
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ width:'100%', padding:8, marginBottom:8 }}/>
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegister} style={{ marginLeft:8 }}>Quick Register</button>
      </form>
      <p style={{ color:'crimson' }}>{error}</p>
    </div>
  )
}
