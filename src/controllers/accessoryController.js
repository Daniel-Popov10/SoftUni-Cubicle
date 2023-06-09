const router = require('express').Router();
const accessoryManager = require('../managers/accessoryManager');

router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post("/addAccessory", async (req, res) => {
    const { name, description, imageUrl } = req.body;
    await accessoryManager.createAccessory({ name, description, imageUrl });
    res.redirect('/');
});

router.get('/attach', (req, res) => {
    console.log('accessory controller reached')
    res.render('accessory/attach');
});


module.exports = router;