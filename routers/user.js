const router = require('express').Router();
const UserController = require('../controllers/user.js');
const authHandler = require('../middlewares/authorization.js');

router.post('/signin', UserController.signIn);
router.post('/register', UserController.registerUser);
router.get('/personalProfile', authHandler, UserController.getPersonalProfile);

module.exports = router;