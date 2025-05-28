const User = require("../database/user");

async function findAllUsers() {
    return await User.find();
}

module.exports = {findAllUsers};