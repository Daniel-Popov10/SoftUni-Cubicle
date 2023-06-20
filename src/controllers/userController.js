const router = require('express').Router();
const userManager = require('../managers/userManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { extractErrorMessages } = require('../utils/errorHelpers');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    try {
        await userManager.registerUser(username, password, repeatPassword);
        res.redirect('/users/login');
    } catch (err) {
        const errorMessages = extractErrorMessages(err);
        return res.status(404).render('user/register', { errorMessages, username });
    }
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const token = await userManager.login(username, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        const errorMessages = extractErrorMessages(err);
        return res.status(404).render('user/login', { errorMessages, username });
    }


});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;