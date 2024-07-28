const mongoose = require('mongoose');

const mealTimeSchema = new mongoose.Schema({ // start & end times for each meal
  start: { type: String, required: true },
  end: { type: String, required: true }
})

const dailyScheduleSchema = new mongoose.Schema({ // operating hours & meal times
  hours: [
    {
      open: { type: String, required: true },
      close: { type: String, required: true }
    }
  ],
  meals: {
    breakfast: mealTimeSchema,
    lunch: mealTimeSchema,
    dinner: mealTimeSchema,
    snack: mealTimeSchema,
  }
})

const addressSchema = new mongoose.Schema({ // address of meal provider
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postal_code: { type: String, required: true },
})

const contactSchema = new mongoose.Schema({ // contact information for meal provider
  phone: {
    primary: {
      number: { type: String, required: true },
      ext: { type: String }
    },
    secondary: {
      number: { type: String },
      ext: { type: String }
    }
  },
  website: { type: String, required: true }
})

const mealSchema = new mongoose.Schema({ // meal provider schema
  name: { type: String, required: true },
  address: addressSchema,
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  contact: contactSchema,
  population: { type: String, required: true },
  notes: { type: String },
  service_dog_allowed: { type: Boolean, required: true },
  wheelchair_accessible: { type: Boolean, required: true },
  schedule: {
    monday: dailyScheduleSchema,
    tuesday: dailyScheduleSchema,
    wednesday: dailyScheduleSchema,
    thursday: dailyScheduleSchema,
    friday: dailyScheduleSchema,
    saturday: dailyScheduleSchema,
    sunday: dailyScheduleSchema,
  },
  claimed_by: { type: String },
  last_updated: { type: Date }
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal