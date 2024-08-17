const router = require('express').Router();
const staffController = require('../controllers/staff.js');
const authHandler = require('../middlewares/authorization.js');

router.post('/signin', staffController.signIn);
router.get('/personalProfile', authHandler, staffController.getPersonalProfile);
router.put('/editProfile', authHandler, staffController.editstaffProfile);

module.exports = router