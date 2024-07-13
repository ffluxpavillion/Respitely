const mongoose = require('mongoose');

// Helper function to validate time format
const validateTimeFormat = (time) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:mm format
  return regex.test(time);
};

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    required: true
  },
  start_time: {
    type: String,
    required: true,
    validate: {
      validator: validateTimeFormat,
      message: props => `${props.value} is not a valid time format, please use HH:mm.`
    }
  },
  end_time: {
    type: String,
    required: true,
    validate: {
      validator: validateTimeFormat,
      message: props => `${props.value} is not a valid time format, please use HH:mm.`
    }
  }
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
