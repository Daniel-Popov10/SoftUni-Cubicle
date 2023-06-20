const router = require("express").Router();
const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");
const { getDifficultyOptionsViewData } = require('../utils/viewHepler');
const { isAuth } = require('../middlewares/authMiddleware');
const { extractErrorMessages } = require('../utils/errorHelpers');

router.get('/create', (req, res) => {
  res.render('cube/create');
});

router.post("/addCube", isAuth, async (req, res) => {

  const { name, description, imageUrl, difficultyLevel } = req.body;

  try {
    await cubeManager.createCube({
      name,
      description,
      imageUrl,
      difficultyLevel: Number(difficultyLevel),
      creator: req.user._id,
    });
    console.log('created')
    res.redirect("/");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    res.render('cube/create', { errorMessages });
  }

});

router.get("/details/:cubeId", async (req, res) => {
  const id = req.params.cubeId;
  const cubeDetails = await cubeManager.getCubeWithAccessories(id).lean();

  const isCreator = cubeDetails.creator?.toString() === req.user?._id;

  if (!cubeDetails) {
    res.redirect("/404");
  }

  res.render("cube/details", { cubeDetails, isCreator });
});

router.get('/:cubeId/attach-accessory', isAuth, async (req, res) => {
  const cubeId = req.params.cubeId;
  const cubeDetails = await cubeManager.getSingleCube(cubeId);
  const accessories = await accessoryManager.getNotAttached(cubeDetails.accessories);
  const hasAccessories = accessories.length > 0;
  res.render('accessory/attach', { cubeDetails, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', isAuth, async (req, res) => {
  const cubeId = req.params.cubeId;
  const accessoryId = req.body.accessory;
  await cubeManager.attachAccessory(cubeId, accessoryId);
  res.redirect(`/cubes/details/${cubeId}`);
});

router.get('/:cubeId/edit-cube', isAuth, async (req, res) => {
  const cubeId = req.params.cubeId;
  const cubeDetails = await cubeManager.getSingleCube(cubeId);
  const options = getDifficultyOptionsViewData(cubeDetails.difficultyLevel);
  res.render('cube/edit', { cubeDetails, options });
});

router.post('/:cubeId/edit-cube', isAuth, async (req, res) => {
  const cubeId = req.params.cubeId;
  const newCubeData = req.body;
  await cubeManager.updateCube(cubeId, newCubeData);
  res.redirect(`/cubes/details/${cubeId}`);
});

router.get('/:cubeId/delete-cube', isAuth, async (req, res) => {
  const cubeId = req.params.cubeId;
  const cubeDetails = await cubeManager.getSingleCube(cubeId);
  const options = getDifficultyOptionsViewData(cubeDetails.difficultyLevel);
  res.render('cube/delete', { cubeDetails, options });
});

router.post('/:cubeId/delete-cube', isAuth, async (req, res) => {
  const cubeId = req.params.cubeId;
  await cubeManager.deleteCube(cubeId);
  res.redirect('/');
});

module.exports = router;
