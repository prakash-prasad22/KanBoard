const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['pending', 'ongoing', 'completed'], default: 'pending' },
  description: String,
  comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
