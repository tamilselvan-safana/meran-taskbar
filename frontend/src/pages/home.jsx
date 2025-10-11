import React, { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'

function Home() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tasks');
        if (!res.ok) throw new Error('Failed to fetch tasks')
        const data = await res.json();
        setTasks(data)
        console.log(data);
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  return (
    <div className="home-container">
     <header className="topbar">
        <div className="topbar-left">
          <div className="app-icon">TS</div>
          <div className="app-title">Task Manager</div>
        </div>

        <nav className="topbar-center">
          <button className={`tb-link ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`tb-link ${filter==='active'?'active':''}`} onClick={() => setFilter('active')}>Active</button>
          <button className={`tb-link ${filter==='completed'?'active':''}`} onClick={() => setFilter('completed')}>Completed</button>
        </nav>

        <div className="topbar-right">
          <a href="/create" className="btn-primary">+ New Task</a>
        </div>
      </header> 

      {loading && <div className="center">Loading tasks...</div>}
      {error && <div className="error center">{error}</div>}

      {!loading && !error && (
        <div className="task-grid">
          {tasks.length === 0 && <div className="center">No tasks found</div>}
          {tasks
            .filter(t => {
              if (filter === 'all') return true
              if (filter === 'active') return !t.is_completed
              if (filter === 'completed') return !!t.is_completed
            })
            .map(t => (
              <TaskCard key={t._id || t.id} task={t} onToggleParent={(newState) => {
                // update local state optimistically
                setTasks(prev => prev.map(p => (p._id === t._id ? { ...p, ...newState } : p)))
              }} onDelete={(id) => {
                setTasks(prev => prev.filter(p => (p._id || p.id) !== id))
              }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
