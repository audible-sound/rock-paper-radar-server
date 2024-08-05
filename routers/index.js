const router = require('express').Router();
const userRouter = require('./user.js');
const staffRouter = require('./staff.js');

router.use('/user', userRouter);
router.use('/staff', staffRouter);

module.exports = router;