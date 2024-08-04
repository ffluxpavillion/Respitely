const router = require('express').Router();
const { getMealsByDay, getAllMealsByCity } = require('../controllers/meal-controller');

// Routes
router.get('/:city/meals', getAllMealsByCity); // GET all meals for a city
router.get('/:city/meals/:day', getMealsByDay); // GET all meals for a city by day

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
