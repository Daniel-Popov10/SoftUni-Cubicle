const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username must be between 5 and 15 characters!'],
        maxLength: [15, 'Username must be between 5 and 15 characters!'],
        match: [/^[A-Za-z0-9]+$/, 'Invalid characters, username must consist of letters or numbers only!'],
        unique: {
            value: true,
            message: 'Username already taken!',
        }
    },
    password: {
        type: String,
        validate: {
            validator: function (value) {
                return /^[A-Za-z0-9]+$/.test(value);
            },
            message: 'Invalid characters, password must consist of letters or numbers only!',
        },
        minLength: [8, 'Password must be between 8 and 15 characters!'],
        maxLength: [15, 'Password must be between 8 and 15 characters!'],
    },
});

// userSchema.path('username').validate(function (value) {
//     const user = mongoose.model('User').findOne({ username: value });
//     return !!user;
// }, 'Username already taken!');

userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) {
        throw new Error('Passwords do not match!');
    }
});


userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 15);
    this.password = hash;

});

const user = mongoose.model('User', userSchema);

module.exports = user;