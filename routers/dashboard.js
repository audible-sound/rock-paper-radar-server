const router = require('express').Router();
const dashboardController = require('../controllers/dashboard.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/totalCreatedUserAccount', authHandler, dashboardController.getTotalCreatedUserAccount)

router.get('/monthlyCreatedUserAccount', authHandler, dashboardController.getMonthlyCreatedUserAccount)
router.get('/yearlyCreatedUserAccount', authHandler, dashboardController.getYearlyCreatedUserAccount)

router.get('/monthlyCreatedPost', authHandler, dashboardController.getMonthlyCreatedPost)
router.get('/yearlyCreatedPost', authHandler, dashboardController.getYearlyCreatedPost)

module.exports = router;

