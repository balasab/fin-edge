const TransactionModel = require('../models/transactionModel');

class Analytics {
    static async getSummary() {
        const transactions = await TransactionModel.findAll();

        const summary = {
            totalIncome: 0,
            totalExpense: 0,
            balance: 0,
            transactionCount: transactions.length
        };

        transactions.forEach(t => {
            if (t.type === 'income') {
                summary.totalIncome += t.amount;
            } else if (t.type === 'expense') {
                summary.totalExpense += t.amount;
            }
        });

        summary.balance = summary.totalIncome - summary.totalExpense;
        return summary;
    }
}

module.exports = Analytics;
