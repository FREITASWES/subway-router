const Role = require('../models/role-model');

async function createRole(roleData) {
    const role = new Role(roleData);
    return await role.save(); // Salva no banco de dados e retorna o documento criado
}

module.exports = {
    createRole,
};