const router = require('express').Router();
const { createProviderRequest, getProviderRequests, updateProviderRequestStatus } = require('../controllers/provider-controller');

router.post('/:city/provider-requests', createProviderRequest);
router.get('/:city/provider-requests', getProviderRequests);
router.patch('/:city/provider-requests/:id/status', updateProviderRequestStatus);

module.exports = router;