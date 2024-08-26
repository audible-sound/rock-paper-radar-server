const router = require('express').Router();
const staffController = require('../controllers/staff.js');
const authHandler = require('../middlewares/authorization.js');

router.post('/signin', staffController.signIn);
router.get('/personalProfile', authHandler, staffController.getPersonalProfile);
router.get('/profile', authHandler, staffController.getProfile);
router.put('/profile', authHandler, staffController.editstaffProfile);

router.get('/reportPost', authHandler, staffController.getReportPost)
router.post('/bannedPost', authHandler, staffController.createBannedPost)
router.get('/bannedPost', authHandler, staffController.getBannedPost)
router.put('/reportPost', authHandler, staffController.updateReportPostState)

router.get('/reportComment', authHandler, staffController.getReportComment)
router.post('/bannedComment', authHandler, staffController.createBannedComment)
router.get('/bannedComment', authHandler, staffController.getBannedComment)
router.put('/reportComment', authHandler, staffController.updateReportCommentState)

router.get('/reportUser', authHandler, staffController.getReportUser);
router.put('/reportUser', authHandler, staffController.updateReportUserState)

module.exports = router