const userService = require('../services/userService');

async function getAllUsers(req, res) {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro no controller:", error);
        res.status(500).json({ message: "Erro ao buscar usuários", error});
    }
}

module.exports = { getAllUsers };