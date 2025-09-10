const mongoose = require('mongoose');
const Task = require('./models/Task');

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kanban-board';
mongoose.connect(MONGO).then(async () => {
  console.log('Seeding DB...');
  await Task.deleteMany({});
  await Task.insertMany([
    { title: 'Send Figma file', status: 'pending' },
    { title: 'Review GitHub issues', status: 'ongoing', comments: [{ name: 'David', text: 'Ensure review before merging' }] },
    { title: 'Create technical contents', status: 'completed' }
  ]);
  console.log('Seed done');
  process.exit(0);
}).catch(err => console.error(err));
