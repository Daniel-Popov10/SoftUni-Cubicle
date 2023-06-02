const moongoose = require('mongoose');

const cubeSchema = new moongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
});

const cube = moongoose.model('Cube', cubeSchema);
module.exports = cube;