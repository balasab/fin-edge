const TransactionModel = require('../models/transactionModel');
const UserModel = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

class TransactionService {
    static async addTransaction(data) {
        const { userId, type, category, amount, date } = data;

        if (!userId || !type || !category || !amount || !date) {
            throw { status: 400, message: 'Missing required fields' };
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            throw { status: 404, message: 'User not found' };
        }

        const validTypes = ['income', 'expense'];
        if (!validTypes.includes(type)) {
            throw { status: 400, message: 'Invalid transaction type' };
        }

        const newTransaction = {
            id: uuidv4(),
            userId,
            type,
            category,
            amount: parseFloat(amount),
            date,
            createdAt: new Date().toISOString()
        };

        return await TransactionModel.create(newTransaction);
    }

    static async getAllTransactions() {
        return await TransactionModel.findAll();
    }

    static async getTransactionById(id) {
        const transaction = await TransactionModel.findById(id);
        if (!transaction) {
            throw { status: 404, message: 'Transaction not found' };
        }
        return transaction;
    }

    static async updateTransaction(id, updates) {
        // Prevent editing protected fields
        delete updates.id;
        delete updates.userId;
        delete updates.createdAt;

        const updatedTransaction = await TransactionModel.update(id, updates);
        if (!updatedTransaction) {
            throw { status: 404, message: 'Transaction not found' };
        }
        return updatedTransaction;
    }

    static async deleteTransaction(id) {
        const success = await TransactionModel.delete(id);
        if (!success) {
            throw { status: 404, message: 'Transaction not found' };
        }
        return { message: 'Transaction deleted successfully' };
    }
}

module.exports = TransactionService;
