const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [5, 'Cube name must be at least 5 characters long!'],
        match: [/^[A-Za-z0-9 ]+$/, 'Invalid characters, name must consist of only letters numbers and whitespaces!'],
    },
    description: {
        type: String,
        minLength: [20, 'Description must be at least 20 characters long!'],
        match: [/^[A-Za-z0-9 ]+$/, 'Invalid characters, description must consist of only letters numbers and whitespaces!'],
    },
    imageUrl: {
        type: String,
        match: [/^[http:\/\/ | https:\/\/]+\w+\S+$/, 'Image must be a valid link starting with https or https!'],
    },
    difficultyLevel: Number,
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const cube = mongoose.model('Cube', cubeSchema);
module.exports = cube;