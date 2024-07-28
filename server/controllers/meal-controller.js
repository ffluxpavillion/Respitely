const TorontoMeal = require('../models/torontoMeal');
const VancouverMeal = require('../models/vancouverMeal');

// Validate the city and day parameters
const validCities = ['toronto', 'vancouver'];
const validDays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

// Fetch all meals for /:city/:day
const getMealsByDay = async (req, res) => {
  const city = req.params.city.toLowerCase();
  const day = req.params.day.toLowerCase();

  if (!validCities.includes(city)) {
    return res.status(400).json({ error: 'Invalid city parameter' });
  }

  if (!validDays.includes(day)) {
    return res.status(400).json({ error: 'Invalid day parameter' });
  }

  const MealModel = city === 'toronto' ? TorontoMeal : VancouverMeal;

  try {
    // Fetch meals that have a schedule for the specified day
    const meals = await MealModel.find({
      [`schedule.${day}`]: { $exists: true },
    });
    console.log(`${city} Meals fetched for ${day}:`, meals.length);

    if (!meals.length) {
      return res
        .status(404)
        .json({ error: `No meal data found for ${city} on ${day} ` });
    }

    // Prepare response to include only the schedule for the requested day
    const response = meals.map((meal) => {
      const mealObj = meal.toObject();
      return {
        _id: mealObj._id,
        name: mealObj.name,
        address: mealObj.address,
        latitude: mealObj.latitude,
        longitude: mealObj.longitude,
        contact: mealObj.contact,
        population: mealObj.population,
        notes: mealObj.notes,
        service_dog_allowed: mealObj.service_dog_allowed,
        wheelchair_accessible: mealObj.wheelchair_accessible,
        schedule: {
          [day]: mealObj.schedule[day],
        },
        claimed_by: mealObj.claimed_by,
        last_updated: mealObj.last_updated,
      };
    });

    res.json(response);
  } catch (err) {
    console.error(`Error fetching meals for ${city} on ${day}:`, err);
    res.status(500).json({ error: err.message });
  }
};

// Fetch all meals for /:city
const getAllMealsByCity = async (req, res) => {
  const city = req.params.city.toLowerCase();

  if (!validCities.includes(city)) {
    return res.status(400).json({ error: 'Invalid city parameter' });
  }

  const MealModel = city === 'toronto' ? TorontoMeal : VancouverMeal;

  try {
    // Fetch all meals for the specified city
    const meals = await MealModel.find({});
    console.log(`${city} Meals fetched:`, meals.length);

    if (!meals.length) {
      return res.status(404).json({ error: `No meal data found for ${city}` });
    }

    res.json(meals);
  } catch (err) {
    console.error(`Error fetching meals for ${city}:`, err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMealsByDay,
  getAllMealsByCity,
};
