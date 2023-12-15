const express = require('express');
const app = express();
const cors = require('cors');

// setting up env

require('dotenv').config();
let { PORT, BACKEND_URL } = process.env;

PORT = process.env.PORT || 8081;

// app.use(cors({ origin: process.env.CORS_ORIGIN })); // CORS Middleware
app.use(express.json());

// Routes
const shelterRoutes = require('./routes/shelters'); // routes
app.use('/shelters', shelterRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to the SafeHavenTO Server!');
});

app.use((req, res) => {
  res.send('This is not a valid route. Try <b>/shelters</b> instead.');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});