const manufacturerService = require('../services/manufacturer-service');

async function createManufacturer(req, res) {
    try {
        const newManufacturer = await manufacturerService.createManufacturer(req.body);
        res.status(201).json(newManufacturer);
    } catch (error) {
        console.error("Error in controller manufacturer:", error);
        res.status(500).json({
            message: "Error creating manufacturer",
            error: "Internal Server Error",
            code: "MANUFACTURER_CREATION_FAILED"
        });
    }
}

module.exports = {createManufacturer};
