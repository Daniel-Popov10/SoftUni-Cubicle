const router = require("express").Router();
const cubeManager = require("../models/cubeManager");

router.get("/", (req, res) => {
  const { search, from, to } = req.query;
  const allCubes = cubeManager.getAllCubes(search, from, to);
  console.log(search, from, to);
  res.render("index", { allCubes, search, from, to });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
