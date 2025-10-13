import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tasks/${id}`)
        if (!res.ok) throw new Error('Failed to fetch task')
        const t = await res.json()
        setTitle(t.title)
        setDescription(t.description)
        setDueDate(t.to_completed ? new Date(t.to_completed).toISOString().slice(0,16) : '')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description , to_completed: dueDate ? new Date(dueDate) : null })
      })
      if (!res.ok) throw new Error('Failed to update task')
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="center">Loading...</div>
  if (error) return <div className="center error">{error}. Please go back to <a href="/">Tasks</a>.</div>

  return (
    <div className="home-container">
      <header className="create-topbar"><h1>Edit Task</h1></header>
      
      <form onSubmit={onSave} className="create-form create-card">
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={6} />
        <label>Due Date</label>
        <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <div>
          <button className="btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={() => navigate('/')} className="btn-ghost" style={{marginLeft:8}}>Cancel</button>
        </div>
        </form>
        
    </div>
  )
}
