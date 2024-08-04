const axios = require('axios');

const geocodeAddress = async (address) => {
  const apiKey = process.env.REACT_APP_MAPBOX;
  const addressString = `${address.street}, ${address.city}, ${address.province}, ${address.postal_code}`;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addressString)}.json?access_token=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.features && response.data.features.length > 0) {
      const [longitude, latitude] = response.data.features[0].geometry.coordinates;
      return { longitude, latitude };
    } else {
      throw new Error('Unable to geocode address');
    }
  } catch (error) {
    throw new Error(`Geocoding error: ${error.message}`);
  }
};

module.exports = geocodeAddress;