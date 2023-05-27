// TODO: Require Controllers...
const router = require("express").Router();
const homeController = require("../controllers/homeController");

// TODO...

router.use(homeController);

module.exports = router;
