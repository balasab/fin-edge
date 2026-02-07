const fs = require('fs/promises');
const path = require('path');

const dataPath = path.join(__dirname, '../data/transactions.json');

class TransactionModel {
    static async findAll() {
        try {
            const data = await fs.readFile(dataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    static async findById(id) {
        const transactions = await this.findAll();
        return transactions.find(t => t.id === id);
    }

    static async findByUserId(userId) {
        const transactions = await this.findAll();
        return transactions.filter(t => t.userId === userId);
    }

    static async create(transaction) {
        const transactions = await this.findAll();
        transactions.push(transaction);
        await fs.writeFile(dataPath, JSON.stringify(transactions, null, 2));
        return transaction;
    }

    static async update(id, updates) {
        const transactions = await this.findAll();
        const index = transactions.findIndex(t => t.id === id);
        if (index === -1) return null;

        transactions[index] = { ...transactions[index], ...updates };
        await fs.writeFile(dataPath, JSON.stringify(transactions, null, 2));
        return transactions[index];
    }

    static async delete(id) {
        let transactions = await this.findAll();
        const initialLength = transactions.length;
        transactions = transactions.filter(t => t.id !== id);

        if (transactions.length === initialLength) return false;

        await fs.writeFile(dataPath, JSON.stringify(transactions, null, 2));
        return true;
    }
}

module.exports = TransactionModel;
