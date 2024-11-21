const { user, post } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    // Register a new user
    static async registerUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const userdetails = await user.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        });

        return userdetails;
    }
    static async getUserById(userId) {
        return await user.findById(userId);
    }

    // Login method
    static async loginUser(credentials) {
        const userData = await user.findOne({
            where: { email: credentials.email },
        });
        if (!userData) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, userData.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        // Create JWT token
        const token = jwt.sign(
            { id: userData.id, email: userData.email, name: userData.name },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' },
        );
        return { user, token };
    }

    // Fetch user with their associated post
    static async getUserWithPost(userId) {
        return await user.findOne({
            where: { id: userId },
            attributes: ['name', 'email'],
            include: [
                {
                    model: post,
                    as: 'post',
                    attributes: ['title', 'content', 'userId'],
                },
            ],
        });
    }

    //get all user data with post
    static async getAllUserWithPost() {
        return await user.findAll({
            attributes: ['name'],
            include: [{ model: post, as: 'post', attributes: ['title', 'content'] }],
        });
    }

    
}

module.exports = UserService;
