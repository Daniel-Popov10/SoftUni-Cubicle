const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
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