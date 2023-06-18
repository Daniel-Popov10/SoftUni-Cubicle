const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username is not long enough!'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric!'],
        unique: {
            value: true,
            message: 'Username already taken!'
        }
    },
    password: {
        type: String,
        validate: {
            validator: function (value) {
                return /^[A-Za-z0-9]+$/.test(value);
            },
            message: 'Invalid password characters!',
        },
        minLength: [5, 'Password is not long enough!'],
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