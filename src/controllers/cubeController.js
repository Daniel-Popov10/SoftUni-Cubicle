const router = require("express").Router();
const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");
const { getDifficultyOptionsViewData } = require('../utils/viewHepler');

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
  const cubeDetails = await cubeManager.getCubeWithAccessories(id).lean();
  if (!cubeDetails) {
    res.redirect("/404");
  }

  res.render("cube/details", { cubeDetails });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
  const cubeId = req.params.cubeId;
  const cubeDetails = await cubeManager.getSingleCube(cubeId);
  const accessories = await accessoryManager.getNotAttached(cubeDetails.accessories);
  const hasAccessories = accessories.length > 0;
  res.render('accessory/attach', { cubeDetails, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
  const cubeId = req.params.cubeId;
  const accessoryId = req.body.accessory;
  await cubeManager.attachAccessory(cubeId, accessoryId);
  res.redirect(`/cubes/details/${cubeId}`);
});

router.get('/:cubeId/edit-cube', async (req, res) => {
  const cubeId = req.params.cubeId;
  const cubeDetails = await cubeManager.getSingleCube(cubeId);
  const options = getDifficultyOptionsViewData(cubeDetails.difficultyLevel);
  res.render('cube/edit', { cubeDetails, options });
});

router.post('/:cubeId/edit-cube', async (req, res) => {
  const cubeId = req.params.cubeId;
  const newCubeData = req.body;
  await cubeManager.updateCube(cubeId, newCubeData);
  res.redirect(`/cubes/details/${cubeId}`);
});

module.exports = router;
