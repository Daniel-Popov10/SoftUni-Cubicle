const router = require("express").Router();
const cubeManager = require("../managers/cubeManager");

router.get("/create", (req, res) => {
  res.render("cube/create");
});

router.post("/addCube", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  await cubeManager.createCube({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect("/");
});

router.get("/details/:cubeId", async (req, res) => {
  const id = req.params.cubeId;
  const cubeDetails = await cubeManager.getSingleCube(id);

  if (!cubeDetails) {
    res.redirect("/404");
  }

  res.render("cube/details", { cubeDetails });
});

module.exports = router;
