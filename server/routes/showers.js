const router = require('express').Router();

router.get('/:city/showers', (req, res) => {
  const city = req.params.city;
  res.json({ mssg: `GET all ${city} showers` });
});

router.get('/:city/showers/:day', (req, res) => {
  const city = req.params.city;
  const day = req.params.day;
  res.json({ mssg: `GET all ${city} showers ${day.charAt(0).toUpperCase() + day.substring(1)}` });
});


module.exports = router;
