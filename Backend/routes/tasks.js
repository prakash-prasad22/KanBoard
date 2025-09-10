const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /:id
router.get('/:id', async (req, res) => {
  try {
    const t = await Task.findById(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    res.json(t);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST add
router.post('/add', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// PUT update
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// PUT update-status (legacy endpoint)
router.put('/update-status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
