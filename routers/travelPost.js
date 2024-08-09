const router = require('express').Router();
const authHandler = require('../middlewares/authorization.js');
const TravelPostController = require('../controllers/travelPost.js');

/*
Implement for authprization for post requests
*/
router.get('/', TravelPostController.getPosts);
router.get('/:id', TravelPostController.getPostById);

router.post('/', authHandler, TravelPostController.createPost);

router.put('/:id', TravelPostController.likePost);

module.exports = router;