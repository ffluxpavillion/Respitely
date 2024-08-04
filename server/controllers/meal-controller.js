const TorontoMeal = require('../models/toronto-meal');
const VancouverMeal = require('../models/vancouverMeal');

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

const getMeals = async (req, res) => { // GET all meals for a city
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

  try { // Fetch location information + drop-in meal schedule for specific day-- /api/v1/:city/meals?day=:day
    let query = { };
    if (day) {
      query[`schedule.${day}`] = { $exists: true };

      const meals = await MealModel.find(query);
      console.log(`${city} Meals fetched${day ? ` for ${day}` : ''}:`, meals.length);

      if (!meals.length) {
        return res.status(404).json({ error: `No meal data found for ${city}${day ? ` on ${day}` : ''}` });
      }

      const response = meals.map(meal => { // Prepare response to include only the schedule for the requested day
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
          last_updated: mealObj.last_updated
        };
      });

      res.json(response);

  } else { // Fetch location information + full drop-in meal schedule -- /api/v1/:city/meals
    const meals = await MealModel.find({});
    console.log(`${city} Meals fetched:`, meals.length);

    if (!meals.length) {
      return res.status(404).json({ error: `No meal data found for ${city}` });
    }

    res.json(meals);
  }
  } catch (err) {
    console.error(`Error fetching meals for ${city}${day ? ` on ${day}` : ''}:`, err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMeals,
};
