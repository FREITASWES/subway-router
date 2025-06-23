const roleService = require('../services/roleService');

async function createRole(req, res) {
    try {
        const newRole = await roleService.createRole(req.body);
        res.status(201).json(newRole);
    } catch (error) {
        console.error("Erro no controller:", error);
        res.status(500).json({
            message: "Erro ao criar role",
            error: error.message || error
        });
    }
}

module.exports = {createRole};