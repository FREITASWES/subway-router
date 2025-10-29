const manufacturerRepository = require('../repositories/manufacturer-repository');

async function createManufacturer(manufacturerData) {
    try {
        const newManufacturer = await manufacturerRepository.createManufacturer(manufacturerData);
        return newManufacturer;
    } catch (error) {
        throw new Error('Error in service while creating manufacturer: ' + error.message);
    }
}

module.exports = {
    createManufacturer
};
