const User = require('../models/user');

const userManager = {
    registerUser: async (username, password) => {
        const user = new User({ username, password });
        await user.save();
        return user;
    }
};

module.exports = userManager;