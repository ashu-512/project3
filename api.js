
export async function api(path, { method='GET', body, token } = {}){
  const headers = { 'Content-Type': 'application/json' }
  token = token || localStorage.getItem('token')
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined })
  if (!res.ok) throw new Error((await res.json()).message || 'API error')
  return res.json()
}
