const router = require("express").Router();
const cubeManager = require("../models/cubeManager");

router.get("/", (req, res) => {
  const allCubes = cubeManager.getAllCubes();
  console.log(allCubes);
  res.render("index", { allCubes });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
