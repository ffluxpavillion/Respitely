const ProviderRequest = require('../models/provider-request');

const createProviderRequest = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      orgName,
      email,
      phone,
      website,
      mealId,
      additionalMessage,
    } = req.body;

    const newRequest = new ProviderRequest({
      firstName,
      lastName,
      orgName,
      email,
      phone,
      website,
      mealId,
      additionalMessage,
      status: 'pending',
    });

    await newRequest.save();

    res.status(201).json({ message: 'Provider request submitted successfully' });
  } catch (error) {
    console.error('Error creating provider request:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {createProviderRequest}