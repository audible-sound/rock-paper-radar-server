const router = require('express').Router();
const feedbackController = require('../controllers/feedback.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/', authHandler, feedbackController.getFeedbacks);
router.get('/:id', authHandler, feedbackController.getFeedbackById);
router.post('/', authHandler, feedbackController.createFeedback);
router.post('/getUserData', authHandler, feedbackController.getUserDataByIdandUserType);
router.post('/reply', authHandler, feedbackController.replyToFeedback);
router.get('/:id/replies', authHandler, feedbackController.getFeedbackWithReplies);
router.put('/reply/:id', authHandler, feedbackController.editFeedbackReply);
router.delete('/reply/:id', authHandler, feedbackController.deleteFeedbackReply);

module.exports = router;