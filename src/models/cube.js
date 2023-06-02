const moongoose = require('mongoose');

const cube = new moongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
});

module.exports = cube;