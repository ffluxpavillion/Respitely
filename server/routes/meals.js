const router = require('express').Router();
const { getMealsByDay, getAllMealsByCity } = require('../controllers/meal-controller');

// Routes
router.get('/:city/:day', getMealsByDay);
router.get('/:city', getAllMealsByCity);

module.exports = router;
