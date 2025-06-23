const roleRepository = require('../repositories/roleRepository');

async function createRole(roleData) {
    return await roleRepository.createRole(roleData);
}

module.exports = {createRole};