const router = require('express').Router();
const blogController = require('../controllers/blog.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogsById);
router.post('/', authHandler, blogController.createBlog);
router.delete('/:id', authHandler, blogController.deleteBlog);
router.put('/:id', authHandler, blogController.editBlog);

module.exports = router;