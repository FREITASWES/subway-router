const Manufacturer = require('../models/manufacturer-model');

async function createManufacturer(manufacturerData) {
    try {
        const newManufacturer = await Manufacturer.create(manufacturerData);
        return newManufacturer;
    } catch (error) {
        throw new Error('Error creating manufacturer: ' + error.message);
    }
}

module.exports = {
    createManufacturer,
};
