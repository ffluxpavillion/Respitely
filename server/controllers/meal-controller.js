const TorontoMeal = require('../models/toronto-meal');
const VancouverMeal = require('../models/vancouver-meal');
const geocodeAddress = require('../helpers/geocode');
const mongoose = require('mongoose');

const validCities = ['toronto', 'vancouver'];
const validDays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

// ------------------------ (GET) ALL MEALS -- BY CITY, BY CITY AND DAY OF THE WEEK ------------------------

const getMeals = async (req, res) => {
  // GET all meals for a city
  const city = req.params.city.toLowerCase();
  const day = req.query.day ? req.query.day.toLowerCase() : null;
  const MealModel = city === 'toronto' ? TorontoMeal : VancouverMeal;

  // Validate city and day parameters
  if (!validCities.includes(city)) {
    return res.status(400).json({ error: 'Invalid city parameter' });
  }

  if (day && !validDays.includes(day)) {
    return res.status(400).json({ error: 'Invalid day parameter' });
  }

  try {
    // Fetch provider information + drop-in meal schedule for specific day -- /api/v1/:city/meals?day=:day
    let query = {};
    if (day) {
      query[`schedule.${day}`] = { $exists: true };

      const meals = await MealModel.find(query);
      console.log(
        `${city} Meals fetched${day ? ` for ${day}` : ''}:`,
        meals.length
      );

      if (!meals.length) {
        return res
          .status(404)
          .json({
            error: `No meal data found for ${city}${day ? ` on ${day}` : ''}`,
          });
      }

      const response = meals.map((meal) => {
        // Prepare response to include only the schedule for the requested day
        const mealObj = meal.toObject();
        return {
          id: mealObj._id,
          name: mealObj.name,
          address: mealObj.address,
          latitude: mealObj.latitude,
          longitude: mealObj.longitude,
          contact: mealObj.contact,
          population: mealObj.population,
          notes: mealObj.notes,
          service_dog_allowed: mealObj.service_dog_allowed,
          wheelchair_accessible: mealObj.wheelchair_accessible,
          schedule: day ? { [day]: mealObj.schedule[day] } : mealObj.schedule,
          claimed_by: mealObj.claimed_by,
          last_updated: mealObj.last_updated,
        };
      });

      res.json(response);
    } else { // Else, fetch provider info + ENTIRE drop-in meal schedule -- /api/v1/:city/meals

      const meals = await MealModel.find({}).sort({ createdAt: -1 });
      console.log(`${city} Meals fetched:`, meals.length);

      if (!meals.length) {
        return res
          .status(404)
          .json({ error: `No meal data found for ${city}` });
      }

      res.json(meals); // Return all meals
    }
  } catch (err) {
    console.error(
      `Error fetching meals for ${city}${day ? ` on ${day}` : ''}:`,
      err
    );
    res.status(500).json({ error: err.message });
  }
};

// ------------------------ (GET) SINGLE MEAL -- BY ID ------------------------ -- /api/v1/:city/meals/:id

const getMeal = async (req, res) => { // GET a single meal for a city by id
  const city = req.params.city.toLowerCase();
  const id  = req.params.id;
  const MealModel = city === 'toronto' ? TorontoMeal : VancouverMeal;

  if (!validCities.includes(city)) { // Validate city parameter
    return res.status(400).json({ error: 'Invalid city parameter' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) { // Validate id type is mongoDB ObjectId
    return res.status(404).json({ error: 'No such meal' });
  }

  try {
    // Fetch meal by ID
    const meal = await MealModel.findById(id);

    if (!meal) {
      // Return error if meal not found
      return res
        .status(404)
        .json({ error: `No meal data found with ID ${id} in ${city}` });
    }

    res.status(200).json(meal);
  } catch (error) {
    console.error(`Error fetching meal with ID ${id} in ${city}:`, err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------------ (POST) CREATE MEALS ------------------------ -- /api/v1/:city/meals

const createMeal = async (req, res) => {
  const { city }  = req.params;
  const MealModel = city === 'toronto' ? TorontoMeal : VancouverMeal;

  // Validate city and day parameters
  if (!validCities.includes(city)) {
    return res.status(400).json({ error: 'Invalid city parameter' });
  }

  const { // destructure req.body
    name,
    address,
    contact,
    population,
    notes,
    service_dog_allowed,
    wheelchair_accessible,
    schedule,
    claimed_by,
  } = req.body;

  try {
    // geocode address to get lat and long
    const { latitude, longitude } = await geocodeAddress(address);

    // add doc to db
    const meal = await MealModel.create({ // create new meal
      name,
      address,
      latitude,
      longitude,
      contact,
      population,
      notes,
      service_dog_allowed,
      wheelchair_accessible,
      schedule,
      claimed_by,
    });
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ------------------------ (DELETE) REMOVE MEALS ------------------------ -- /api/v1/:city/meals

  const deleteMeal = async (req, res) => {
    const city = req.params.city.toLowerCase();
    const id  = req.params.id;
    const MealModel = city === 'toronto' ? TorontoMeal : VancouverMeal;

    if (!validCities.includes(city)) { // Validate city parameter
      return res.status(400).json({ error: 'Invalid city parameter' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) { // Validate id type is mongoDB ObjectId
      return res.status(404).json({ error: 'No such meal' });
    }

    const meal = await MealModel.findOneAndDelete({ _id: id });

    if (!meal) {
      return res.status(400).json({ error: 'No such meal' });
    }

    res.status(200).json(meal);
  }

  // ------------------------ (PATCH) UPDATE MEALS ------------------------ -- /api/v1/:city/meals

  const updateMeal = async (req, res) => { // PATCH a single meal for a city by id
    const city = req.params.city.toLowerCase();
    const id = req.params.id;
    const MealModel = city === 'toronto' ? TorontoMeal : VancouverMeal;

    if (!validCities.includes(city)) { // Validate city parameter
      return res.status(400).json({ error: 'Invalid city parameter' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) { // Validate id type is mongoDB ObjectId
      return res.status(404).json({ error: 'No such meal' });
    }

    const meal = await MealModel.findOneAndUpdate({ _id: id }, { // Find meal by id and update
      ...req.body
    }, { new: true });

    if (!meal) {
      return res.status(400).json({ error: 'No such meal' });
    }

    res.status(200).json(meal); // Return updated meal
  }

module.exports = {
  getMeals,
  getMeal,
  createMeal,
  deleteMeal,
  updateMeal
};
