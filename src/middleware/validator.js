const validateTransaction = (req, res, next) => {
    const { userId, type, category, amount, date } = req.body;

    if (!userId || !type || !category || !amount || !date) {
        return res.status(400).json({
            error: {
                message: 'Missing required fields',
                status: 400
            }
        });
    }

    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({
            error: {
                message: 'Amount must be a positive number',
                status: 400
            }
        });
    }

    const validTypes = ['income', 'expense'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            error: {
                message: 'Invalid transaction type',
                status: 400
            }
        });
    }

    next();
};

module.exports = {
    validateTransaction
};
