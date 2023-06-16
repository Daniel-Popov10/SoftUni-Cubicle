const Cube = require('../models/cube');

const cubeManager = {
  getAllCubes: async (search, from, to) => {
    let result = await Cube.find().lean();

    if (search) {
      result = await Cube.find({ name: { $regex: search, $options: 'i' } }).lean();
    }

    if (from && to) {
      result = await Cube.find({ $and: [{ difficultyLevel: { $gte: from } }, { difficultyLevel: { $lte: to } }] }).lean();
    }
    return result;
  },

  getSingleCube: (id) => Cube.findById(id).lean(),
  getCubeWithAccessories: (id) => Cube.findById(id).populate('accessories'),

  createCube: async (cubeData) => {
    const cube = new Cube(cubeData)

    await cube.save();
    return cube;
  },

  attachAccessory: async (cubeId, accessoryId) => {
    const updatedAccessoriesCube = await Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accessoryId } });
    return updatedAccessoriesCube.save();
  },
  updateCube: (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData),
  deleteCube: (cubeId) => Cube.findByIdAndDelete(cubeId),
};

module.exports = cubeManager;
