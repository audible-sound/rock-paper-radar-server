const router = require('express').Router();
const UserController = require('../controllers/user.js');

router.post('/signin', UserController.signIn);
router.post('/register', UserController.registerUser);

module.exports = router;