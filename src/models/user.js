const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username is not long enough!'],
        match: /^[A-Za-z0-9]+$/,
        unique: true,
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

userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) {
        throw new mongoose.Error('Passwords do not match!');
    }
});


userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 15);
    this.password = hash;

});

const user = mongoose.model('User', userSchema);

module.exports = user;