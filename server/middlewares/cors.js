const cors = require('cors');

// Enable CORS based on the environment
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
  // methods: ['GET', 'POST', 'PUT', 'DELETE']
};

module.exports = cors(corsOptions);