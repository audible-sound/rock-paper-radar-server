const router = require('express').Router();
const authHandler = require('../middlewares/authorization.js');
const TravelPostController = require('../controllers/travelPost.js');

/*
Implement for authorization for post requests
*/
router.get('/', TravelPostController.getPosts);
router.get('/post', TravelPostController.getPostById);
router.get('/username', TravelPostController.getUserPosts);

router.post('/', authHandler, TravelPostController.createPost);
router.put('/:id', authHandler, TravelPostController.likePost);

router.post('/reportPost',authHandler,TravelPostController.createReportPost);

module.exports = router;