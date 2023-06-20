const router = require('express').Router();
const accessoryManager = require('../managers/accessoryManager');
const { extractErrorMessages } = require('../utils/errorHelpers');

router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post("/addAccessory", async (req, res) => {

    const { name, description, imageUrl } = req.body;

    try {
        await accessoryManager.createAccessory({ name, description, imageUrl });
        res.redirect('/');
    } catch (err) {
        const errorMessages = extractErrorMessages(err);

        return res.status(400).render('cube/create', { errorMessages });
    }

});


module.exports = router;