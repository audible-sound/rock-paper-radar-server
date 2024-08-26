const router = require('express').Router();
const userGuideController = require('../controllers/userGuide.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/', authHandler, userGuideController.getUserGuides);
router.post('/', authHandler, userGuideController.createUserGuide);
router.delete('/:id', authHandler, userGuideController.deleteUserGuide);
router.put('/:id', authHandler, userGuideController.editUserGuide);

module.exports = router;