// TODO: Require Controllers...
const router = require("express").Router();
const homeController = require("../controllers/homeController");
const cubeController = require("../controllers/cubeController");

// TODO...

router.use(homeController);
router.use("/cubes", cubeController);
router.use("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
