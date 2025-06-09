const ProviderRequest = require('../models/provider-request');


// ------------------------ (POST) PROVIDER REQUEST ------------------------ -- /api/v1/:city/provier-request

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

// ------------------------ (GET) PROVIDER REQUESTS ------------------------ -- /api/v1/:city/provider-requests

const getProviderRequests = async (req, res) => {
  try {
    // Filter by city (req.params.city)
    const requests = await ProviderRequest.find().lean();
    res.json(requests);
  } catch (error) {
    console.error('Error fetching provider requests:', error);
    res.status(500).json({ error: 'Server error fetching provider requests' });
  }
};


module.exports = {createProviderRequest, getProviderRequests}