const express = require('express');
const TravelPlanController = require('../controllers/travelPlan');
const authHandler = require('../middlewares/authorization');
const router = express.Router();

router.post('/', authHandler, TravelPlanController.createTravelPlan);
router.put('/:id', authHandler, TravelPlanController.editTravelPlan);
router.delete('/:id', authHandler, TravelPlanController.deleteTravelPlan);
router.get('/user', authHandler, TravelPlanController.getUserTravelPlans);

module.exports = router;