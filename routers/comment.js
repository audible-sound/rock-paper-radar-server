const express = require('express');
const router = express.Router();
const authHandler = require('../middlewares/authorization');
const CommentController = require('../controllers/comment');

router.post('/:postId', authHandler, CommentController.createComment);
router.get('/:postId', authHandler, CommentController.getCommentsForPost);
router.put('/:commentId', authHandler, CommentController.editComment);
router.delete('/:commentId', authHandler, CommentController.deleteComment);

module.exports = router;