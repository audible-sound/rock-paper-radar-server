const router = require('express').Router();
const blogController = require('../controllers/blog.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/', blogController.getBlogs);
router.get('/myBlogs', authHandler, blogController.getMyBlogs);
router.get('/post/:id', blogController.getBlogsById);
router.post('/', authHandler, blogController.createBlog);
router.delete('/post/:id', authHandler, blogController.deleteBlog);
router.put('/post/:id', authHandler, blogController.editBlog);
router.get('/public/:username', blogController.getBlogsByUsername);

module.exports = router;