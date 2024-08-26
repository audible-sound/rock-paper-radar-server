const router = require('express').Router();
const bugReportController = require('../controllers/bugReports.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/', authHandler, bugReportController.getBugReports);
router.get('/:id', authHandler, bugReportController.getBugReportById);
router.post('/', authHandler, bugReportController.createBugReport);
router.put('/:id/state', authHandler, bugReportController.updateBugState);
router.delete('/:id', authHandler, bugReportController.deleteBugReport);

module.exports = router;