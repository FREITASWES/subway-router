const userService = require('../services/userService');

async function getAllUsers(req, res) {
    try {
        const users = await userService.getUsers();
        return res.status(200).json({
            message: 'Users fetched successfully',
            data: users   
        });
    } catch (error) {
        console.error('Error getting users:', error);
        return res.status(500).json({
            code: 'GET_USERS_FAILED',
            message: 'Error when searching for users'
        });
    }
}

async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const updateUser = await userService.updateUser(id, req.body);
        return res.status(200).json({
            message: 'User updated successfully',
            data: updateUser
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({
            code: 'UPDATE_USER_FAILED',
            message: 'Error updating user'
        });
    }
}

async function getUserById(req, res) {
    try {
        const {id} = req.params;
        const user = await userService.getUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by id:', error);
        return res.status(500).json({
            code: 'GET_USER_BY_ID_FAILED',
            message: 'Error getting user by id'
        });
    }
}

async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            message: 'Error creating user'
        });
    }
}

async function patchUser (req, res) {
    try {
        const id = req.params.id;
        const data = req.body;

        const patchUser = await userService.patchUser(id, data);

        return res.status(200).json({
            message: "user updated partially",
            data: patchUser
        });
    } catch (error) {
        console.error('Error patching user:', error);
        return res.status(500).json({
            message: 'Error patching user'
        });
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const deleted = await userService.deleteUser(id);

        return res.status(200).json({
            message: "User deleted successfully",
            data: deleted
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            message: 'Error deleting user'
        });
    }
}

module.exports = {getAllUsers, createUser, getUserById, updateUser, patchUser, deleteUser};
