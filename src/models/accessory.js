const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
});

const accessory = mongoose.model('Accessory', accessorySchema);

module.exports = accessory;