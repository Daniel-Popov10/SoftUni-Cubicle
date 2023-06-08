const Accessory = require('../models/accessory');

const accessoryManager = {
    createAccessory: async (accessoryData) => {
        const accessory = new Accessory;

        await accessory.save();

        return accessory;
    }
};