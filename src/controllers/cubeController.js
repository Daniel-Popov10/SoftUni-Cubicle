const router = require("express").Router();
const cubeManager = require("../models/cubeManager");

router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/details/:cubeId", (req, res) => {
  const id = req.params.cubeId;
  const cubeDetails = cubeManager.getSingleCube(id);
  console.log(cubeDetails);
  res.render("details", { cubeDetails });
});

module.exports = router;
