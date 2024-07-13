const mongoose = require('mongoose');

// Helper function to validate time format
const validateTimeFormat = (time) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:mm format
  return regex.test(time);
};

const hoursSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  hours: {
    open: {
      type: String,
      validate: {
        validator: validateTimeFormat,
        message: props => `${props.value} is not a valid time format! Use HH:mm.`
      }
    },
    close: {
      type: String,
      validate: {
        validator: validateTimeFormat,
        message: props => `${props.value} is not a valid time format! Use HH:mm.`
      }
    }
  },
  meals: [mealSchema]
});
