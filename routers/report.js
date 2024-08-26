const router = require('express').Router();
const reportController = require('../controllers/reports.js');
const authHandler = require('../middlewares/authorization.js');

router.post('/', authHandler, reportController.createUserReport);

module.exports = router;