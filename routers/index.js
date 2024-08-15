const router = require('express').Router();
const userRouter = require('./user.js');
const commentRouter = require('./comment.js');
const travelPostRouter = require('./travelPost.js');
const markerDataRouter = require('./markerData.js');
const travelPlanRouter = require('./travelPlan.js');

router.use('/user', userRouter);
router.use('/comment', commentRouter);
router.use('/travelPost', travelPostRouter);
router.use('/markerData', markerDataRouter);
router.use('/travelPlan', travelPlanRouter);
module.exports = router;