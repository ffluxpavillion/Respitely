const mongoose = require('mongoose');
const dayScheduleSchema = require('./day-schedule').schema;

const temporaryScheduleSchema = new mongoose.Schema({
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  schedule: [dayScheduleSchema]
});

module.exports = mongoose.model('TemporarySchedule', temporaryScheduleSchema);
