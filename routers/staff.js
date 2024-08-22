const router = require('express').Router();
const staffController = require('../controllers/staff.js');
const authHandler = require('../middlewares/authorization.js');

router.post('/signin', staffController.signIn);
router.get('/personalProfile', authHandler, staffController.getPersonalProfile);
router.get('/profile', authHandler, staffController.getProfile);
router.put('/profile', authHandler, staffController.editstaffProfile);
router.delete('/:id', authHandler, staffController.deleteStaff);
router.put('/:id', authHandler, staffController.updateStaffPriviledges);

module.exports = router