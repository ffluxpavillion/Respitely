const mongoose = require('mongoose');

const ProviderRequestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  orgName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  mealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
    required: false
  },
  additionalMessage: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// const ProviderRequest = mongoose.createConnection(process.env.MONGODB_URI_TORONTO).model('provider_requests', ProviderRequestSchema);

// module.exports = ProviderRequest;

module.exports = mongoose.model('provider_requests', ProviderRequestSchema);

