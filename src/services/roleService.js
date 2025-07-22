const roleRepository = require('../repositories/roleRepository');

function createRole(roleData) {
    return roleRepository.createRole(roleData);
}

module.exports = {createRole};