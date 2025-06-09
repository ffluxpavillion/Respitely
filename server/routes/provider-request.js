const router = require('express').Router();
const { createProviderRequest, getProviderRequests } = require('../controllers/provider-controller');

router.post('/:city/provider-requests', createProviderRequest);
router.get('/:city/provider-requests', getProviderRequests);


module.exports = router;