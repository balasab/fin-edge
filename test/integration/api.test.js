const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../src/app');
const fs = require('fs/promises');
const path = require('path');

describe('API Integration Tests', () => {
    // Reset data before tests
    before(async () => {
        await fs.writeFile(path.join(__dirname, '../../src/data/users.json'), '[]');
        await fs.writeFile(path.join(__dirname, '../../src/data/transactions.json'), '[]');
    });

    let userId;

    describe('User Routes', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/users')
                .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });

            expect(res.status).to.equal(201);
            expect(res.body.data).to.have.property('id');
            userId = res.body.data.id;
        });

        it('should get user by id', async () => {
            const res = await request(app).get(`/users/${userId}`);
            expect(res.status).to.equal(200);
            expect(res.body.data.email).to.equal('test@example.com');
        });
    });

    describe('Transaction Routes', () => {
        it('should create a transaction', async () => {
            const res = await request(app)
                .post('/transactions')
                .send({
                    userId,
                    type: 'income',
                    category: 'Salary',
                    amount: 5000,
                    date: '2023-10-01'
                });

            expect(res.status).to.equal(201);
            expect(res.body.data.amount).to.equal(5000);
        });

        it('should get summary', async () => {
            const res = await request(app).get('/summary');
            expect(res.status).to.equal(200);
            expect(res.body.data.totalIncome).to.equal(5000);
            expect(res.body.data.balance).to.equal(5000);
        });
    });
});
