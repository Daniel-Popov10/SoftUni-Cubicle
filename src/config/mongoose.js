const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/cubicle'

const dbConnect = async () => {
    await mongoose.connect(uri);
    console.log('Database connected');
};

module.exports = dbConnect;