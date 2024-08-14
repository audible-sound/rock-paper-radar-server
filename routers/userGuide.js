const router = require('express').Router();
const userGuideController = require('../controllers/userGuide.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/', userGuideController.getUserGuides);
router.get('/:searchString', userGuideController.getUserGuidesByString);

router.post('/', authHandler, userGuideController.createUserGuide);

module.exports = router;