const router = require('express').Router();
const blogController = require('../controllers/blog.js');

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogsById);

router.post('/', blogController.createBlog);

module.exports = router;