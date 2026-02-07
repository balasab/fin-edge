const UserService = require('../services/userService');

class UserController {
    static async register(req, res, next) {
        try {
            const user = await UserService.registerUser(req.body);
            res.status(201).json({
                message: 'User registered successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUser(req, res, next) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.status(200).json({ data: user });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
