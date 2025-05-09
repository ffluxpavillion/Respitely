const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express(); // create an express app
const connectToDatabase = require('./db/connection');
const corsMiddleware = require('./middlewares/cors');

// setting up env
require('dotenv').config(); // Load the root-level .env
dotenv.config({ path: path.resolve(__dirname, './server/.env') });

// setting up port
let { PORT } = process.env;
PORT = process.env.PORT || 8081;

// CORS Middleware
app.use(corsMiddleware); // Enable CORS

// CORS Middleware -- set headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN); // Allow any domain
  // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

// Middleware
app.use(express.json()); // automatically converts any request body we make to API Server, to JSON
app.use(cookieParser()); // allows server to handle cookies
app.use(express.urlencoded({ extended: false })); // allows server to handle form data

// Connect to MongoDB
connectToDatabase();

// Routes
// const authRoutes = require('./routes/auth-routes');
const shelterRoutes = require('./routes/shelters');
const mealRoutes = require('./routes/meals');
const showersRoutes = require('./routes/showers');


// app.use(authRoutes);
app.use('/shelters', shelterRoutes);
app.use('/api/v1', mealRoutes, showersRoutes);

app.get('/api/maps-key', (req, res) => {
  res.json({ key: process.env.REACT_APP_MAPBOX });
});


// --- REMOVE THIS BLOCK IN PRODUCTION !!! ---
// app.get('/', (req, res) => {
//   res.send('Welcome to the Respitely Server!');
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build'))); // Serve static files from the React app

  // Serve React app for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.use((req, res) => {
  res.send('This is not a valid route. Try <b>/shelters</b> or <b>/api/v1/:city/meals</b> or <b>/api/v1/:city/meals?day=:day</b> instead.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log('Press CTRL + C to stop server');
});