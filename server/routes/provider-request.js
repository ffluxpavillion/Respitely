const router = require('express').Router();
const { createProviderRequest } = require('../controllers/provider-controller');

router.post('/:city/provider-requests', createProviderRequest);

module.exports = router;