const express = require('express');
const router = express.Router();
const Task = require('./task');

// Get all tasks

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single task

router.get('/tasks/:id', getTask, (req, res) => {
  res.json(res.task);
});

// Create a new task    

router.post('/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description
  })

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

// Update a task using the patch method

router.patch('/tasks/:id', getTask, async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title;
  }

  if (req.body.description != null) {
    res.task.description = req.body.description;
  }

  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

// Update a task using the put method

router.put('/tasks/:id', getTask, async (req, res) => {
    if (req.body.title != null || req.body.description == null) { 
        return res.status(400).json({ message: 'Invalid request body' })
  }

    res.task.title = req.body.title;
    res.task.description = req.body.description;

  try {
    const updatedTask = await res.task.save()
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

// Delete a task

router.delete('/tasks/:id', getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }

  res.task = task
  next()
})

module.exports = router;

