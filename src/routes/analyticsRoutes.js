const express = require('express');
const AnalyticsController = require('../controllers/analyticsController');

const router = express.Router();

router.get('/', AnalyticsController.getSummary);

module.exports = router;
