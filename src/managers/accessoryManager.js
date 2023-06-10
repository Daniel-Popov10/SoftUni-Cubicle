const Accessory = require('../models/accessory');

const accessoryManager = {
    createAccessory: async (accessoryData) => {
        const accessory = new Accessory(accessoryData);

        await accessory.save();

        return accessory;
    },

    getAccessories: () => Accessory.find().lean(),
};

module.exports = accessoryManager;