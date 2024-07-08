const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  completedArts:
  {
    type: Number,
  },
  completedArtsId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Art'
  }],
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
