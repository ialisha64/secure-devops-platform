const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend', timestamp: new Date() });
});

app.get('/api/tasks', (req, res) => {
  res.json([
    { id: 1, title: 'Setup CI/CD Pipeline', done: false },
    { id: 2, title: 'Configure Kubernetes', done: false },
    { id: 3, title: 'Setup Monitoring', done: false }
  ]);
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  res.status(201).json({ id: Date.now(), title, done: false });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
