const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time_to_complete: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  completedUserId: [{
    type: String,
    ref: 'User'
  }],
});

const Art = mongoose.model('Art', artSchema);

module.exports = Art;
