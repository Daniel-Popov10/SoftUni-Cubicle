const User = require('../models/user');
const bcrypt = require('bcrypt');

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

        return user;
    },
};

module.exports = userManager;