import React, { useState } from 'react'
import './create.css'
import { useNavigate } from 'react-router-dom'

function Create() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, to_completed: dueDate ? new Date(dueDate) : null })
      })
      if (!res.ok) throw new Error('Failed to create task')
      navigate('/')
      console.log(res); 
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div>
      <header className="create-topbar">

        <div className="create-topbar-left">
          <h2>Create Task</h2>
        </div>

        <div className='create-topbar-right'>
          <button className='homebtn' onClick={() => navigate('/')}>Home</button>
        </div>
      
      </header>
      </div>

      <form onSubmit={onSubmit} className="create-form create-card">
        {error && <div className="error">{error}</div>}
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />

        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Task description" rows={6} />
        <label>Due Date</label>
        <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} />

        <div style={{marginTop:12}}>
          <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Task'}</button>
          <button type="button" onClick={() => navigate('/')} style={{marginLeft:8}} className="btn-ghost">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default Create
