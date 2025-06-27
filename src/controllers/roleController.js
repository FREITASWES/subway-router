const roleService = require('../services/roleService');

async function createRole(req, res) {
    try {
        const newRole = await roleService.createRole(req.body);
        res.status(201).json(newRole);
    } catch (error) {
        console.error("Controller error:", error);
        res.status(500).json({
            message: "Error creating role",
            error: error.message || error
        });
    }
}

module.exports = {createRole};