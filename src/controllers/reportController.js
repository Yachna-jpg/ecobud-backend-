const Report = require('../models/Report');
const User = require('../models/user');

// @desc    Create a new report
// @route   POST /api/reports
// @access  Private
const createReport = async (req, res) => {
  const { image, latitude, longitude, description } = req.body;

  const report = new Report({
    user: req.user._id,
    image,
    location: {
      latitude,
      longitude,
    },
    description,
  });

  const createdReport = await report.save();
  
  // Award points based on logic (optional for prototype)
  const user = await User.findById(req.user._id);
  user.points += 10; // 10 points for reporting
  await user.save();

  res.status(201).json(createdReport);
};

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private (Admin only or Public?)
const getReports = async (req, res) => {
  const reports = await Report.find({}).populate('user', 'name email');
  res.json(reports);
};

// @desc    Get my reports
// @route   GET /api/reports/my
// @access  Private
const getMyReports = async (req, res) => {
  const reports = await Report.find({ user: req.user._id });
  res.json(reports);
};

// @desc    Update report status
// @route   PATCH /api/reports/:id/status
// @access  Private/Admin
const updateReportStatus = async (req, res) => {
  const { status } = req.body;
  const report = await Report.findById(req.params.id);

  if (report) {
    report.status = status;
    const updatedReport = await report.save();
    res.json(updatedReport);
  } else {
    res.status(404).json({ message: 'Report not found' });
  }
};

module.exports = {
  createReport,
  getReports,
  getMyReports,
  updateReportStatus,
};
