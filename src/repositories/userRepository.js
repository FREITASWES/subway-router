const User = require('../models/user-model');

async function createUser(data) {
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        console.error(`Error in userRepository.createUser: ${error.message}`);
        throw error;
    }
}

async function findUser(filter = {}, options = {}) {
    try {
        var page = 1;
        var limit = 10;

        if(options.page && options.page > 0) {
            page = options.page;
    }
        if(options.limit && options.limit > 0) {
            limit = options.limit;
    }

        const skip = (page - 1) * limit;

        const cursor = User.find(filter).skip(skip).limit(limit).lean();
        const results = await cursor.exec();
        const total = await User.countDocuments(filter);

        return {results, total, page, limit};
    } catch (error) {
        console.error(`Error in userRepository.findUser: ${error.message}`);
        throw error;
    }
}

async function findUserById(id) {
    try {
        return await User.findById(id);
    } catch (error) {
        console.error(`Error in userRepository.findUserById: ${error.message}`);
        throw error;
    }
}
async function updateUserById(id, update) {
    try {
        return await User.findByIdAndUpdate(id, update, {new: true});
    } catch (error) {
        console.error(`Error in userRepository.updateUserById: ${error.message}`);
        throw error;
    }
}
async function patchUserById(id, patch) {
    try {
        return await User.findByIdAndUpdate(id, patch, {new: true});
    } catch (error) {
        console.error(`Error in userRepository.patchUserById: ${error.message}`);
        throw error;
    }
}
async function deactivateUser(id) {
    try {
        return await User.findByIdAndUpdate(id, {active: false}, {new: true});
    } catch (error) {
        console.error(`Error in userRepository.deactivateUser: ${error.message}`);
        throw error;
    }
}
async function findAllUsers() {
    try {
        return await User.find({});
    } catch (error) {
        console.error(`Error in userRepository.findAllUsers: ${error.message}`);
        throw error;
    }
}
async function findByEmail(email){
    try {
        return await User.findOne({'contact.email': email});
    } catch (error) {
        console.error(`Error in userRepository.findByEmail: ${error.message}`);
        throw error;
    }
}

async function deleteUser(id) {
    try {
        return await User.findByIdAndDelete(id, {active: false}, {new: true});
    } catch (error) {
        console.error(`Error in userRepository.deleteUser: ${error.message}`);
        throw error;
    }
}

module.exports = {createUser, findUser, findUserById, updateUserById, patchUserById, deactivateUser, findAllUsers, findByEmail, deleteUser};
