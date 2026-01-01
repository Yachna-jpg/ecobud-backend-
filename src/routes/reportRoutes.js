const express = require('express');
const router = express.Router();
const {
  createReport,
  getReports,
  getMyReports,
  updateReportStatus,
} = require('../controllers/reportController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createReport)
  .get(protect, getReports); // Can refine access later

router.get('/my', protect, getMyReports);
router.patch('/:id/status', protect, admin, updateReportStatus);

module.exports = router;
