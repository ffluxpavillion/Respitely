const fs = require("fs");
const router = require("express").Router();
const dataController = require('../controllers/dataController');
const express = require('express');



router.route('/').get(dataController.getShelters);

module.exports = router;
