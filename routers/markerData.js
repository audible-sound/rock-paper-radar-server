const router = require('express').Router();
const authHandler = require('../middlewares/authorization.js');
const MarkerDataController = require('../controllers/markerData.js');

router.get('/', MarkerDataController.getMarkers);
router.post('/', authHandler, MarkerDataController.createMarker);
router.delete('/:id', authHandler, MarkerDataController.deleteMarker);

module.exports = router;
