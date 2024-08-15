const router = require('express').Router();
const feedbackController = require('../controllers/feedback.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/', authHandler, feedbackController.getFeedbacks);
router.get('/:id', authHandler, feedbackController.getFeedbackById);
router.post('/', authHandler, feedbackController.createFeedback);

module.exports = router;