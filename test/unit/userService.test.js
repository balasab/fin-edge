const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const UserService = require('../../src/services/userService');
const UserModel = require('../../src/models/userModel');

describe('UserService', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('registerUser', () => {
        it('should register a new user successfully', async () => {
            const userData = { name: 'John', email: 'john@example.com', password: 'pass' };

            sinon.stub(UserModel, 'findByEmail').resolves(null);
            sinon.stub(UserModel, 'create').resolves({ id: '123', ...userData });

            const result = await UserService.registerUser(userData);

            expect(result).to.have.property('id', '123');
            expect(result).to.have.property('email', 'john@example.com');
        });

        it('should throw error if user already exists', async () => {
            const userData = { name: 'John', email: 'john@example.com', password: 'pass' };

            sinon.stub(UserModel, 'findByEmail').resolves({ id: '123', ...userData });

            try {
                await UserService.registerUser(userData);
            } catch (err) {
                expect(err.status).to.equal(409);
                expect(err.message).to.equal('User already exists');
                return;
            }
            throw new Error('Should have thrown an error');
        });
    });
});
