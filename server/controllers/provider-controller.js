const ProviderRequest = require('../models/provider-request');


// ------------------------ (POST) PROVIDER REQUEST ------------------------ -- /api/v1/:city/provier-requests

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
    const requests = await ProviderRequest.find()
    .lean();
    res.json(requests);
  } catch (error) {
    console.error('Error fetching provider requests:', error);
    res.status(500).json({ error: 'Server error fetching provider requests' });
  }
};

// ------------------------ (PATCH) PROVIDER STATUS REQUESTS ------------------------ -- /api/v1/:city/provider-requests

const updateProviderRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status, internalNotes } = req.body;

  try {
    const updated = await ProviderRequest.findByIdAndUpdate(
      id,
      {
        status,
        ...(internalNotes !== undefined && { internalNotes })
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating access request status:', err);
    res.status(500).json({ message: 'Failed to update status' });
  }
  console.log('Updating request', id, status, internalNotes);
};

module.exports = {createProviderRequest, getProviderRequests, updateProviderRequestStatus}