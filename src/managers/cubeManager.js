const Cube = require('../models/cube');

const cubeManager = {
  getAllCubes: getAllCubes = async (search, from, to) => {
    let result = await Cube.find().lean();

    if (search) {
      result = await Cube.find({ name: { $regex: search, $options: 'i' } }).lean();
    }

    if (from && to) {
      result = await Cube.find({ $and: [{ difficultyLevel: { $gte: from } }, { difficultyLevel: { $lte: to } }] }).lean();
    }
    return result;
  },

  getSingleCube: getSingleCube = (id) => Cube.findById(id).lean(),

  createCube: createCube = async (cubeData) => {
    const cube = new Cube(cubeData)

    await cube.save();
    return cube;
  },
};

module.exports = cubeManager;
