const router = require('express').Router();
const dashboardController = require('../controllers/dashboard.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/totalCreatedUserAccount', authHandler, dashboardController.getTotalCreatedUserAccount)

router.get('/monthlyCreatedUserAccount', authHandler, dashboardController.getMonthlyCreatedUserAccount)
router.get('/yearlyCreatedUserAccount', authHandler, dashboardController.getYearlyCreatedUserAccount)

router.get('/monthlyCreatedPost', authHandler, dashboardController.getMonthlyCreatedPost)
router.get('/yearlyCreatedPost', authHandler, dashboardController.getYearlyCreatedPost)

router.get('/totalUsers', authHandler, dashboardController.getTotalUsers);
router.get('/monthlyUsers', authHandler, dashboardController.getMonthlyUsers);
router.get('/yearlyUsers', authHandler, dashboardController.getYearlyUsers);

router.get('/monthlyActiveUsers', authHandler, dashboardController.getMonthlyActiveUsers);
router.get('/yearlyActiveUsers', authHandler, dashboardController.getYearlyActiveUsers);
router.get('/activeUsers', authHandler, dashboardController.getActiveUsers);

router.get('/monthlyPosts', authHandler, dashboardController.getMonthlyPosts);
router.get('/yearlyPosts', authHandler, dashboardController.getYearlyPosts);

router.get('/monthlyBannedUsers', authHandler, dashboardController.getMonthlyBannedUsers);
router.get('/yearlyBannedUsers', authHandler, dashboardController.getYearlyBannedUsers);

router.get('/totalUsersDetailed', authHandler, dashboardController.getTotalUsersDetailed);

module.exports = router;