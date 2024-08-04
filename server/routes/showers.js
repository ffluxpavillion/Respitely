const router = require('express').Router();

router.get('/:city/showers', (req, res) => {
  const city = req.params.city;
  res.json({ mssg: `GET all ${city} showers` });
});

module.exports = router;
