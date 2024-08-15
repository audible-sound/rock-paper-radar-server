const router = require('express').Router();
const bugReportController = require('../controllers/bugReports.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/', authHandler, bugReportController.getBugReports);
router.get('/:id', authHandler, bugReportController.getBugReportById);
router.post('/', authHandler, bugReportController.createBugReport);

module.exports = router;