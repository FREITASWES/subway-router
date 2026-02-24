const Role = require('../models/role-model');

async function createRole(roleData) {
    const role = new Role(roleData);
    return role.save();
}
async function findById(id) {
    return await Role.findById(id);
}
async function findAllRoles() {
    return await Role.find();
}
module.exports = {
    createRole, findById, findAllRoles
};