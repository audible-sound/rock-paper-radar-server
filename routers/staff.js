const router = require('express').Router();
const staffController = require('../controllers/staff.js');
const authHandler = require('../middlewares/authorization.js');

router.post('/signin', staffController.signIn);
router.post('/register', staffController.registerStaff);
router.get('/personalProfile', authHandler, staffController.getPersonalProfile);
router.put('/editProfile', authHandler, staffController.editstaffProfile);

router.get('/reportPost', authHandler, staffController.getReportPost)
router.post('/bannedPost', authHandler, staffController.createBannedPost)
router.get('/bannedPost', authHandler, staffController.getBannedPost)

router.get('/reportComment', authHandler, staffController.getReportComment)
router.post('/bannedComment', authHandler, staffController.createBannedComment)
router.get('/bannedComment', authHandler, staffController.getBannedComment)

module.exports = router