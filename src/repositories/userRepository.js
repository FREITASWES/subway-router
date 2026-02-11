const User = require('../models/user-model');

async function createUser(data) {
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        console.error('Error creating user', error);
        throw error;
    }
}

async function findUser(filter = {}, options = {}) {
    try {
        let page = 1;
        let limit = 10;

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
        console.error('Error finding users', error);
        throw error;
    }
}

async function findUserById(id) {
    try {
        return await User.findById(id);
    } catch (error) {
        console.error('Error finding user by id', error);
        throw error;
    }
}
async function updateUserById(id, update) {
    try {
        return await User.findByIdAndUpdate(id, update, {new: true});
    } catch (error) {
        console.error('Error updating user by id', error);
        throw error;
    }
}
async function patchUserById(id, patch) {
    try {
        return await User.findByIdAndUpdate(id, patch, {new: true});
    } catch (error) {
        console.error('Error patching user by id', error);
        throw error;
    }
}
async function deactivateUser(id) {
    try {
        return await User.findByIdAndUpdate(id, {active: false}, {new: true});
    } catch (error) {
        console.error('Error deactivating user', error);
        throw error;
    }
}
async function findAllUsers() {
    try {
        return await User.find({});
    } catch (error) {
        console.error('Error finding all users', error);
        throw error;
    }
}
async function findByEmail(email){
    try {
        return await User.findOne({'contact.email': email});
    } catch (error) {
        console.error('Error finding user by email', error);
        throw error;
    }
}

async function deleteUser(id) {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting users', error);
        throw error;
    }
}

module.exports = {createUser, findUser, findUserById, updateUserById, patchUserById, deactivateUser, findAllUsers, findByEmail, deleteUser};
