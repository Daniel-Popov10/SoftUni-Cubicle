const router = require("express").Router();
const cubes = require("../models/cubeManager");

router.get("/", (req, res) => {
  res.render("index", { cubes });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
