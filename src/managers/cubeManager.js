const Cube = require('../models/cube');

const cubeManager = {
  getAllCubes: getAllCubes = async (search, from, to) => {
    let result = await Cube.find().lean();

    if (search) {
      result = await Cube.find({ name: { $regex: search, $options: 'i' } }).lean();
    }

    if (from) {
      result = result.filter((cube) => cube.difficultyLevel >= Number(from));
    }

    if (to) {
      result = result.filter((cube) => cube.difficultyLevel <= Number(to));
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
