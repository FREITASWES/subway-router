const Role = require('../models/role-model');

async function createRole(roleData) {
    const role = new Role(roleData);
    return await role.save();
}

module.exports = {
    createRole,
};