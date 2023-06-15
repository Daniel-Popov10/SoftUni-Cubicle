const router = require('express').Router();
const userManager = require('../managers/userManager');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    await userManager.registerUser(username, password, repeatPassword);
    res.redirect('/users/login');
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

module.exports = router;