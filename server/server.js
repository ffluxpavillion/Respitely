const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');


// setting up env
require('dotenv').config();   // Load the root-level .env
dotenv.config({ path: path.resolve(__dirname, './server/.env') });
let { PORT } = process.env;

PORT = process.env.PORT || 8081;
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));


// if (process.env.NODE_ENV === 'development') {   // Allow requests from any origin in development
//   app.use(cors());
// } else {   // In production, restrict requests to the specified origin
//   const corsOptions = {
//     origin: process.env.CORS_ORIGIN,
//     optionsSuccessStatus: 200,
//   };
//   app.use(cors(corsOptions));
// }

app.use(express.json()); // allows server to handle JSON data sent in req body

// if (process.env.NODE_ENV === 'production') { // Serve static files from the React app
//   app.use(express.static(path.join(__dirname, '../client//build')));
// }

const shelterRoutes = require('./routes/shelters'); // Routes
app.use('/shelters', shelterRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to the SafeHavenTO Server!');
});

app.get('/api/maps-key', (req, res) => {
  res.json({key: process.env.REACT_APP_MAPBOX});
});

// Catch-all route for testing
app.get('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.use((req, res) => {
  res.send('This is not a valid route. Try <b>/shelters</b> instead.');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log('Press CTRL + C to stop server');
});