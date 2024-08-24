const router = require('express').Router();
const userRouter = require('./user.js');
const commentRouter = require('./comment.js');
const travelPostRouter = require('./travelPost.js');
const markerDataRouter = require('./markerData.js');
const travelPlanRouter = require('./travelPlan.js');
const staffRouter = require('./staff.js');
const blogRouter = require('./blog.js');
const userGuideRouter = require('./userGuide.js');
const feedbackRouter = require('./feedback.js');
const adminRouter = require('./admin.js');
const bugRouter = require('./bugReport.js');

router.use('/user', userRouter);
router.use('/comment', commentRouter);
router.use('/travelPost', travelPostRouter);
router.use('/markerData', markerDataRouter);
router.use('/travelPlan', travelPlanRouter);

router.use('/admin', adminRouter);
router.use('/blog', blogRouter);
router.use('/userguide', userGuideRouter);
router.use('/staff', staffRouter);
router.use('/feedback', feedbackRouter)
router.use('/bugreport', bugRouter)

module.exports = router;