const router = require('express').Router();
const UserController = require('../controllers/user.js');
const authHandler = require('../middlewares/authorization.js');

router.post('/signin', UserController.signIn);
router.post('/register', UserController.registerUser);
router.get('/personalProfile', authHandler, UserController.getPersonalProfile);
router.get('/profile', authHandler, UserController.getUserProfile);
router.put('/profile', authHandler, UserController.updateUserProfile);
router.get('/:id', UserController.getUserInfoFromId);

module.exports = router;