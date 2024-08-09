const router = require('express').Router();
const staffController = require('../controllers/staff.js');

router.post('/signin', staffController.signIn);
router.post('/register', staffController.registerStaff);

module.exports = router