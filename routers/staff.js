const router = require('express').Router();
const staffController = require('../controllers/staff.js');
const authHandler = require('../middlewares/authorization.js');

router.post('/signin', staffController.signIn);
router.post('/register', staffController.registerStaff);
router.get('/personalProfile', authHandler, staffController.getPersonalProfile);
router.put('/editProfile', authHandler, staffController.editstaffProfile);

router.get('/reportPost', authHandler, staffController.getReportPost)

module.exports = router