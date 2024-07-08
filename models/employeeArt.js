const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { INPROGRESS, COMPLETED} = require('../constants')

const employeeArtSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  artId: { type: Schema.Types.ObjectId, ref: 'Art' },
  status: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  totalTime: {type: Number, required: true},
  canvasData: {type: Array, required: true}
}, {
  timestamps: true,
});

const EmployeeArt = mongoose.model('EmployeeArt', employeeArtSchema);

module.exports = EmployeeArt;
