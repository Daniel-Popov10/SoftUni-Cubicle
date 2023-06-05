const router = require("express").Router();
const cubeManager = require("../managers/cubeManager");

router.get("/", async (req, res) => {
  const { search, from, to } = req.query;
  const allCubes = await cubeManager.getAllCubes(search, from, to);
  res.render("index", { allCubes, search, from, to });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
