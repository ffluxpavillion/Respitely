const mongoose = require('mongoose');
const DropInCenter = require('./drop-in-center');
const Meal = require('./meal');
const DaySchedule = require('./day-schedule');
const TemporarySchedule = require('./temporary-schedule');

module.exports = {
  DropInCenter,
  Meal,
  DaySchedule,
  TemporarySchedule
};
