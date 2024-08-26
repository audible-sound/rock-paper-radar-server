const router = require('express').Router();
const reportController = require('../controllers/reports.js');
const authHandler = require('../middlewares/authorization.js');

router.get('/', authHandler, reportController.getUserReports);
router.get('/:id', authHandler, reportController.getUserReportsByID);
router.post('/', authHandler, reportController.createUserReport);
// router.delete('/:id', authHandler, reportController.deleteUserReport);
// router.put('/:id', authHandler, reportController.updateUserReport);

module.exports = router;