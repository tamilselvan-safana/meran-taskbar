import React from 'react'
import { Link } from 'react-router-dom'

export default function TaskCard({ task, onToggleParent, onDelete: onDeleteParent }) {
  const due = task.to_completed ? new Date(task.to_completed).toLocaleString() : 'No due date';
  const [saving, setSaving] = React.useState(false)
  const onToggle = async () => {
    const newState = { is_completed: !task.is_completed }
    setSaving(true)
    try {
      const res = await fetch(`api/tasks/${task._id || task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newState)
      })
      if (!res.ok) throw new Error('Failed to update')
      if (typeof onToggleParent === 'function') onToggleParent(newState)
    } catch (e) {
      console.error(e)
    } finally { setSaving(false) }
  }
  
  const onDelete = async () => {
    if (!confirm('Delete this task? This cannot be undone.')) return
    setSaving(true)
    try {
      const res = await fetch(`api/tasks/${task._id || task.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      if (typeof onDeleteParent === 'function') onDeleteParent(task._id || task.id)
    } catch (e) {
      console.error(e)
      alert('Failed to delete task')
    } finally { setSaving(false) }
  }
  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <button className={`status-btn ${task.is_completed ? 'done' : 'pending'}`} onClick={onToggle} disabled={saving} aria-pressed={task.is_completed} aria-label={task.is_completed ? 'Mark active' : 'Mark done'}>
              <span className={`status-dot ${task.is_completed ? 'done' : 'pending'}`} aria-hidden="true"></span>
              <span className="sr-only">{task.is_completed ? 'Done' : 'Pending'}</span>
            </button>
            <Link className="btn-ghost small" to={`/edit/${task._id || task.id}`}>Edit</Link>
            <button className="card-delete" aria-label="Delete task" title="Delete task" onClick={onDelete} disabled={saving}>
              Del
            </button>
          </div>
        </div>
      </div>
      <p className="task-desc">{task.description}</p>
      <div className="task-meta">Due: {due} · Created: {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'unknown'}</div>
    </div>
  )
}
