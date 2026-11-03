const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

let tasks = [];
let nextId = 1;

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.get('/api/tasks', (_, res) => res.json(tasks));

app.post('/api/tasks', (req, res) => {
  if (!req.body.title) return res.status(400).json({ error: 'title required' });
  const task = { id: nextId++, title: req.body.title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const t = tasks.find(x => x.id === +req.params.id);
  if (!t) return res.status(404).json({ error: 'not found' });
  Object.assign(t, req.body);
  res.json(t);
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(x => x.id !== +req.params.id);
  res.status(204).send();
});

module.exports = app;