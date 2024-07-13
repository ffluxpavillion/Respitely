const mongoose = require('mongoose');
const dayScheduleSchema = require('./day-schedule').schema;

const dropInCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postal_code: { type: String, required: true }
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  contact: {
    phone: { type: String, required: true },
    website: { type: String, required: true }
  },
  population: { type: String, required: true },
  service_dog_allowed: { type: Boolean, required: true },
  wheelchair_accessible: { type: Boolean, required: true },
  schedule: [dayScheduleSchema],
  claimed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const DropInCenter = mongoose.model('DropInCenter', dropInCenterSchema);

module.exports = DropInCenter;
