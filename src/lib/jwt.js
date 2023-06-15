const util = require('util');
const jwt = require('jsonwebtoken');

const jsonwebtoken = {
    sign: util.promisify(jwt.sign),
    verify: util.promisify(jwt.verify),
}

module.exports = jsonwebtoken;

