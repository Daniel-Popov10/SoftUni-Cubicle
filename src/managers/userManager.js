const User = require('../models/user');


const userManager = {
    registerUser: async (username, password, repeatPassword) => {

        const user = new User({ username, password, repeatPassword });
        await user.save();
        return user;
    }
};

module.exports = userManager;