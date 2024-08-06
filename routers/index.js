const router = require('express').Router();
const userRouter = require('./user.js');
const travelPostRouter = require('./travelPost.js');

router.use('/user', userRouter);
router.use('/travelPost', travelPostRouter);

module.exports = router;