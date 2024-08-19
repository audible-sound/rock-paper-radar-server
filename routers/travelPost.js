const router = require('express').Router();
const authHandler = require('../middlewares/authorization.js');
const TravelPostController = require('../controllers/travelPost.js');

/*
Implement for authorization for post requests
*/
router.get('/', TravelPostController.getPosts);
router.get('/post', TravelPostController.getPostById);
router.get('/userPosts', TravelPostController.getUserPosts);
router.get('/verifyLike/:postId', authHandler, TravelPostController.checkUserLikedPost);

router.post('/', authHandler, TravelPostController.createPost);
router.put('/like/:id', authHandler, TravelPostController.likePost);
router.put('/:id', authHandler, TravelPostController.editPost);
router.delete('/:id', authHandler, TravelPostController.deletePost);

router.post('/reportPost',authHandler,TravelPostController.createReportPost);
router.post('/reportComment',authHandler,TravelPostController.createReportComment);

module.exports = router;