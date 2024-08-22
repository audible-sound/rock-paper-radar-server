const router = require('express').Router();
const userGuideController = require('../controllers/userGuide.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/', userGuideController.getUserGuides);
router.get('/sections', userGuideController.getUserGuideSections);
router.get('/:id', authHandler, userGuideController.getUserGuideEditData);
router.put('/:id', authHandler, userGuideController.editUserGuide);
router.delete('/:id', authHandler, userGuideController.deleteUserGuide);

router.post('/', authHandler, userGuideController.createUserGuide);

module.exports = router;