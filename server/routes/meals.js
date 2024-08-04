const router = require('express').Router();
const { getMeals, getMeal, createMeal } = require('../controllers/meal-controller');

// Routes

// GET all meals for a city, or query by day of the week
router.get('/:city/meals', getMeals);

// GET a single meal for a city by id
router.get('/:city/meals/:id', getMeal);

// POST a single meal
router.post('/toronto/meals', createMeal);

// DELETE a single meal
router.delete('/:city/meals/:mealId', (req, res) => {
  res.json({ mssg: 'DELETE a meal' });
})

// UPDATE a single meal
router.patch('/:city/meals/:mealId', (req, res) => {
  res.json({ mssg: 'UPDATE a meal' });
})

module.exports = router;
