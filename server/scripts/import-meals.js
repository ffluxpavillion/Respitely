const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const DropInMeals = require('../models/dropInMeals');
const data = require('./dropInMeals.json');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log('Connected to MongoDB - database: Respitely!');

    // Flatten and reformat the JSON data to match the schema
    const formattedData = [];
    for (const region in data.regions) {
      const centers = data.regions[region].drop_in_centers || [];
      centers.forEach(center => {
        const schedule = [];
        for (const day in center.schedule) {
          for (const meal in center.schedule[day]) {
            schedule.push({ day, hours: center.schedule[day].hours, meal });
          }
        }

        // Log the center object for debugging
        console.log('Processing center:', center);

        const formattedCenter = {
          id: center.id || undefined,
          name: center.name || undefined,
          address: center.address || undefined,
          latitude: center.latitude || undefined,
          longitude: center.longitude || undefined,
          city: center.city || undefined,
          province: center.province || undefined,
          postal_code: center.postal_code || undefined,
          phone: center.phone || undefined,
          website: center.website || undefined,
          population: center.population || undefined,
          service_dog_allowed: center.service_dog_allowed === true || center.service_dog_allowed === false ? center.service_dog_allowed : undefined,
          wheelchair_accessible: center.wheelchair_accessible === true || center.wheelchair_accessible === false ? center.wheelchair_accessible : undefined,
          schedule
        };

        // Log the formatted center for debugging
        console.log('Formatted center:', formattedCenter);

        formattedData.push(formattedCenter);
      });
    }

    // Insert the formatted data into the database
    await DropInMeals.insertMany(formattedData);
    console.log('Data successfully imported!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
