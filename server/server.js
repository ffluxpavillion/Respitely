const express = require('express');
const app = express();
const cors = require('cors');

// setting up env

require('dotenv').config();
let { PORT, BACKEND_URL } = process.env;

PORT = process.env.PORT || 8081;

app.use(cors({ origin: process.env.CORS_ORIGIN })); // CORS Middleware
app.use(express.json()); // allows server to handle JSON data sent in req body

// allows browser pre-flight check for JSON requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-Width');
  res.send(200);
})

// Routes
const shelterRoutes = require('./routes/shelters'); // routes
app.use('/shelters', shelterRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to the SafeHavenTO Server!');
});

app.get('/api/maps-key', (req, res) => {
  res.json({key: process.env.REACT_APP_MAPBOX});
});

app.use((req, res) => {
  res.send('This is not a valid route. Try <b>/shelters</b> instead.');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});