const uniqueId = require("uniqid");
const cube = require('../models/cube');

const cubes = [
  {
    id: "1n73sh8holhz66elc",
    name: "Mirror Cube",
    description: "A cool mirror cube",
    imageUrl: "https://m.media-amazon.com/images/I/71TrvUl50OL.jpg",
    difficultyLevel: 4,
  },
  {
    id: "2n73sh8holaz66elc",
    name: "Rubic Classic",
    description: "Evergreen",
    imageUrl:
      "https://www.hpcwire.com/wp-content/uploads/2018/07/Rubiks_Cube_shutterstock_271810067-675x380.jpg",
    difficultyLevel: 3,
  },

  {
    id: "1n73sh8holhz66elc",
    name: "Round cube",
    description: "A cool mirror cube",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0270/0342/0758/files/cubes6_480x480.jpg?v=1609225666",
    difficultyLevel: 6,
  },
  {
    id: "1n73sh8holhz66elc",
    name: "Floating cube",
    description: "A cool mirror cube",
    imageUrl:
      "https://images.unsplash.com/photo-1562774439-23ae4c68ad6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnViaWslMjBjdWJlfGVufDB8fDB8fHww&w=1000&q=80",
    difficultyLevel: 5,
  },

  {
    id: "1n73sh8holhz66elc",
    name: "Hexagon cube",
    description: "A cool mirror cube",
    imageUrl: "https://www.reviewgeek.com/p/uploads/2022/02/3972bf2b.png",
    difficultyLevel: 1,
  },
];

const cubeManager = {
  getAllCubes: (getAllCubes = (search, from, to) => {
    let result = cubes.slice();

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

  createCube: (createCube = (cubeData) => {
    const newCube = {
      id: uniqueId(),
      ...cubeData,
    };
    cubes.push(newCube);
    return newCube;
  }),
};

module.exports = cubeManager;
