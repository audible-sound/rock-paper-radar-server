const router = require('express').Router();
const adminController = require('../controllers/admin.js');
const authHandler = require('../middlewares/authorization.js');

router.post('/registerStaff', authHandler, adminController.registerStaff);
router.post('/signin', adminController.signIn);
router.get('/employees', authHandler, adminController.getEmployees);

module.exports = router