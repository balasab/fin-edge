const Analytics = require('../utils/analytics');

class AnalyticsController {
    static async getSummary(req, res, next) {
        try {
            const summary = await Analytics.getSummary();
            res.status(200).json({ data: summary });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AnalyticsController;
