const router = require('express').Router();
const userRouter = require('./user.js');
const commentRouter = require('./comment.js');
const travelPostRouter = require('./travelPost.js');
// const staffRouter = require('./staff.js');
// const blogRouter = require('./blog.js');
// const userGuideRouter = require('./userGuide.js');

router.use('/user', userRouter);
router.use('/comment', commentRouter);
// router.use('/staff', staffRouter);
// router.use('/blog', blogRouter);
// router.use('/userguide', userGuideRouter);
router.use('/travelPost', travelPostRouter);

module.exports = router;