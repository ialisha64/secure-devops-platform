import React, { useState, useEffect } from 'react';
import './App.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`${API}/api/tasks`)
      .then(r => r.json())
      .then(setTasks)
      .catch(() => setStatus('Backend not reachable'));
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    fetch(`${API}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask })
    })
      .then(r => r.json())
      .then(t => { setTasks([...tasks, t]); setNewTask(''); });
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1>DevOps Task Manager</h1>
      <p style={{ color: status ? 'red' : 'green' }}>{status || 'Connected to backend'}</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a task..."
          style={{ flex: 1, padding: 8, fontSize: 14 }}
        />
        <button onClick={addTask} style={{ padding: '8px 16px' }}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(t => (
          <li key={t.id} style={{ padding: 12, marginBottom: 8, background: '#f5f5f5', borderRadius: 4 }}>
            {t.done ? '✅' : '⬜'} {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
