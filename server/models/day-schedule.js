const mongoose = require('mongoose');
const mealSchema = require('./meal');

// Helper function to validate time format
const validateTimeFormat = (time) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:mm format
  return regex.test(time);
};

const dayScheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  hours: {
    open: {
      type: String,
      required: true,
      validate: {
        validator: validateTimeFormat,
        message: props => `${props.value} is not a valid time format, please use HH:mm.`
      }
    },
    close: {
      type: String,
      required: true,
      validate: {
        validator: validateTimeFormat,
        message: props => `${props.value} is not a valid time format, please use HH:mm.`
      }
    }
  },
  meals: [mealSchema]
});

// Ensure close time is after open time
dayScheduleSchema.pre('save', function (next) {
  if (this.hours.close <= this.hours.open) {
    return next(new Error('Close time must be after open time.'));
  }
  next();
});

const DaySchedule = mongoose.model('DaySchedule', dayScheduleSchema);

module.exports = DaySchedule;
