const router = require('express').Router();
const TravelPostController = require('../controllers/travelPost.js');

/*
Implement for authprization for post requests
*/
router.get('/', TravelPostController.getPosts);
router.get('/:id', TravelPostController.getPostById);

router.post('/', TravelPostController.createPost);

router.put('/:id', TravelPostController.likePost);

module.exports = router;