const User = require('../models/user');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('../lib/jwt');
const { SECRET } = require('../config/const');

const userManager = {
    registerUser: async (username, password, repeatPassword) => {
        const user = new User({ username, password, repeatPassword });
        await user.save();
        return user;
    },

    login: async (username, password) => {
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('Username or password does not match');
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            throw new Error('Username or password does not match');
        }
        const payload = {
            id: user._id,
            username: user.username,
        }

        const token = await jsonwebtoken.sign(payload, SECRET);
        return token;
    },
};

module.exports = userManager;