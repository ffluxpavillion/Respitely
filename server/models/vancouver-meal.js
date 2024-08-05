const mongoose = require('mongoose');

const mealTimeSchema = new mongoose.Schema({
  served: { type: Boolean, required: true}, // start & end times for each meal
  start: { type: String, required: function() { return this.served === true; }},
  end: { type: String, required: function() { return this.served === true; } }
}, { _id: false }); // Prevents Mongoose creating _id

const dailyScheduleSchema = new mongoose.Schema({ // operating hours & meal times
  hours: {
    open: { type: String, required: true },
    close: { type: String, required: true }
  },
  meals: {
    breakfast: mealTimeSchema,
    lunch: mealTimeSchema,
    dinner: mealTimeSchema,
    snack: mealTimeSchema,
  }
}, { _id: false });

const addressSchema = new mongoose.Schema({ // address of meal provider
  street: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postal_code: { type: String, required: true },
}, { _id: false });

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
  website: { type: String, required: true },
  email: { type: String, required: true}
}, { _id: false });

const mealSchema = new mongoose.Schema({ // meal provider schema
  name: { type: String, required: true },
  address: addressSchema,
  latitude: { type: Number },
  longitude: { type: Number },
  contact: contactSchema,
  population: { type: String, required: true, enum: ['Anyone', 'Adults Only', 'Women Only', 'Men Only', 'Youth'] },
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
  claimed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null  },
}, {
  timestamps: true
});

mealSchema.set('toJSON', { // Forcing mongoose to output JSON in specific order
  transform: (doc, ret) => {
    return {
      _id: ret._id,
      name: ret.name,
      address: ret.address,
      latitude: ret.latitude,
      longitude: ret.longitude,
      contact: ret.contact,
      population: ret.population,
      notes: ret.notes,
      service_dog_allowed: ret.service_dog_allowed !== undefined ? ret.service_dog_allowed : null, // Ensuring value is displayed
      wheelchair_accessible: ret.wheelchair_accessible !== undefined ? ret.wheelchair_accessible : null, // Ensuring value is displayed
      schedule: {
        monday: ret.schedule.monday,
        tuesday: ret.schedule.tuesday,
        wednesday: ret.schedule.wednesday,
        thursday: ret.schedule.thursday,
        friday: ret.schedule.friday,
        saturday: ret.schedule.saturday,
        sunday: ret.schedule.sunday
      },
      claimed_by: ret.claimed_by,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  }
});

const VancouverMeal = mongoose.createConnection(process.env.MONGODB_URI_VANCOUVER).model('drop_in_meal', mealSchema);

module.exports = VancouverMeal;