const fs = require('fs/promises');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

class UserModel {
    static async findAll() {
        try {
            const data = await fs.readFile(dataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    static async findById(id) {
        const users = await this.findAll();
        return users.find(user => user.id === id);
    }

    static async findByEmail(email) {
        const users = await this.findAll();
        return users.find(user => user.email === email);
    }

    static async create(user) {
        const users = await this.findAll();
        users.push(user);
        await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
        return user;
    }
}

module.exports = UserModel;
