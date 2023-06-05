const Cube = require('../models/cube');

const cubeManager = {
  getAllCubes: (getAllCubes = (search, from, to) => {
    let result = Cube.find().lean();
    console.log(result);

    if (search) {
      result = result.filter((cube) =>
        cube.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (from) {
      result = result.filter((cube) => cube.difficultyLevel >= Number(from));
    }

    if (to) {
      result = result.filter((cube) => cube.difficultyLevel <= Number(to));
    }

    return result;
  }),

  getSingleCube: (getSingleCube = (id) => cubes.find((cube) => cube.id === id)),

  createCube: (createCube = async (cubeData) => {
    const cube = new Cube(cubeData)

    await cube.save();
    return cube;
  }),
};

module.exports = cubeManager;
