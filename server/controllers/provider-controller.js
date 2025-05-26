const ProviderRequest = require('../models/provider-request');
const mongoose = require('mongoose');


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

    if (!req.file) {
      return res.status(400).json({ error: 'Proof of affiliation file is required.' });
    }

    // Save file path (use multer for file upload??)
    const proofPath = req.file.path;

    const newRequest = new ProviderRequest({
      firstName,
      lastName,
      orgName,
      email,
      phone,
      website,
      mealId,
      additionalMessage,
      proof: proofPath,
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