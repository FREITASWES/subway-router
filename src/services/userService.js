const userRepository = require("../repositories/userRepository");

async function getUsers() {
    return await userRepository.findAllUsers();
}

module.exports = { getUsers };