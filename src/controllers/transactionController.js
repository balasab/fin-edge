const TransactionService = require('../services/transactionService');

class TransactionController {
    static async create(req, res, next) {
        try {
            const transaction = await TransactionService.addTransaction(req.body);
            res.status(201).json({
                message: 'Transaction added successfully',
                data: transaction
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req, res, next) {
        try {
            const transactions = await TransactionService.getAllTransactions();
            res.status(200).json({ data: transactions });
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req, res, next) {
        try {
            const transaction = await TransactionService.getTransactionById(req.params.id);
            res.status(200).json({ data: transaction });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const transaction = await TransactionService.updateTransaction(req.params.id, req.body);
            res.status(200).json({
                message: 'Transaction updated successfully',
                data: transaction
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await TransactionService.deleteTransaction(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = TransactionController;
