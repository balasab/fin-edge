const UserModel = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

class UserService {
    static async registerUser(userData) {
        const { name, email, password } = userData;

        // Basic validation
        if (!name || !email || !password) {
            throw { status: 400, message: 'Missing required fields' };
        }

        // Check if user exists
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            throw { status: 409, message: 'User already exists' };
        }

        // Create new user
        const newUser = {
            id: uuidv4(),
            name,
            email,
            password, // In a real app, hash this!
            createdAt: new Date().toISOString()
        };

        return await UserModel.create(newUser);
    }

    static async getUserById(id) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw { status: 404, message: 'User not found' };
        }
        return user;
    }
}

module.exports = UserService;
