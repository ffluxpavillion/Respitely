const router = require('express').Router();
const dataController = require('../controllers/dataController');

// Define route to get shelters
router.route('/').get(dataController.getShelters);

module.exports = router;