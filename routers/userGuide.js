const router = require('express').Router();
const userGuideController = require('../controllers/userGuide.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/', authHandler, userGuideController.getUserGuides);
router.get('/:searchString', authHandler, userGuideController.getUserGuidesByString);

router.post('/', authHandler, userGuideController.createUserGuide);

module.exports = router;