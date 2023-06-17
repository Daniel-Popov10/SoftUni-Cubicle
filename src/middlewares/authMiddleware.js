const jsonwebtoken = require('../lib/jwt');
const { SECRET } = require('../config/const');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jsonwebtoken.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
            next();
        } catch (err) {
            res.clearCookie('auth');
            res.render('/users/login');
        }

    } else {
        next();
    }
};