const router = require('express').Router();
const userGuideController = require('../controllers/userGuide.js');

router.get('/', userGuideController.getUserGuides);
router.get('/:searchString', userGuideController.getUserGuidesByString);

router.post('/', userGuideController.createUserGuide);

module.exports = router;