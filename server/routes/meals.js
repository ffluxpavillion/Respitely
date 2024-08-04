const router = require('express').Router();
const { getMeals } = require('../controllers/meal-controller');

// Routes

// GET all meals for a city, or query by day of the week
router.get('/:city/meals', getMeals);


// POST a single meal
router.post('/:city/meals', (req, res) => {
  res.json({mssg: 'POST a new meal'});
})

// DELETE a single meal
router.delete('/:city/meals/:mealId', (req, res) => {
  res.json({ mssg: 'DELETE a meal' });
})

// UPDATE a single meal
router.patch('/:city/meals/:mealId', (req, res) => {
  res.json({ mssg: 'UPDATE a meal' });
})

module.exports = router;
