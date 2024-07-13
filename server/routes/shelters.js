const router = require('express').Router();
const dataController = require('../controllers/shelter-controller');

// Define route to get shelters
router.route('/').get(dataController.getShelters);

module.exports = router;