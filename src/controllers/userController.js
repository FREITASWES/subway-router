const userService = require('../services/userService');

async function getAllUsers(req, res) {
    try {
        const users = await userService.getUsers();
        return res.status(200).json({
            code: 'USERS_FETCHED_SUCCESSFULLY',
            message: 'Users fetched successfully',
            data: users   
        });
    } catch (error) {
        console.error('Error in userController.getAllUsers():', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        return res.status(500).json({
            code: 'GET_USERS_FAILED',
            message: 'Error when searching for users',
            error: error.message
        });
    }
}

async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const updateUser = await userService.updateUser(id, req.body);
        return res.status(200).json({
            code: 'USER_UPDATED_SUCCESSFULLY',
            message: 'User updated successfully',
            data: updateUser
        });
    } catch (error) {
        console.error('Error in userController.updateUser():', error);

        var statusCode = 500;
        var code = 'USER_UPDATE_FAILED';
        var message = 'Error updating user';

        if (error.message === 'USER_NOT_FOUND') {
            statusCode = 404;
            code = 'USER_NOT_FOUND';
            message = 'User not found';
        }

        return res.status(statusCode).json ({
            code,
            message,
            timestamp: new Date().toISOString()
       });
    }
}

async function getUserById(req, res) {
    try {
        const {id} = req.params;
        const user = await userService.getUserById(id);
        return res.status(200).json({
            code: 'USER_FOUND',
            data: user
        });
    } catch (error) {
        console.error('Error in userController.getUserById():', error);

        var status = 500;
        var code = 'GET_USER_FAILED';
        var message = 'Error when searching for user';

        if(error.message === 'USER_NOT_FOUND') {
            status = 404;
            code = 'USER_NOT_FOUND';
            message = 'User not found';
        }

        return res.status(status).json({code, message});
    }
}

async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({
            code: 'USER_CREATED_SUCCESSFULLY',
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        console.error('Error within userService.createUser():', error);

        var statusCode = 500;
        var code = 'USER_CREATION_FAILED';
        var message = 'An unexpected error occurred';
        var details = error.message;

        if (error.message.includes('E11000')) {
            statusCode = 409;
            code = 'VALIDATION_ERROR';
            message = 'Email already exists in the system';
            }
           
            switch (error.message) {
                case 'VALIDATION_ERROR':
                    statusCode = 400;
                    code = 'VALIDATION_ERROR';
                    message = 'Invalid user data provied';
                    break;
                case 'ROLE_NOT_FOUND':
                    statusCode = 404;
                    code = 'ROLE_NOT_FOUND';
                    message = 'Role not found';
                    break;
            }

        return res.status(statusCode).json({
            code,
            message,
            timestamp: new Date().toISOString(),
         });
    }
}

async function patchUser (req, res) {
    try {
        const id = req.params.id;
        const data = req.body;

        const patchUser = await userService.patchUser(id, data);

        return res.status(200).json({
            code: "USER_PATCHED_SUCCESSFULLY",
            message: "user updated partially",
            data: patchUser
        });
    } catch (error) {
        console.error('Error in userController.patchUser():', error);

        var status = 500;
        var code = 'PATCH_FAILED';
        var message = 'Unexpected error';

        if (error.message === 'USER_NOT_FOUND') {
            status = 404;
            code = 'USER_NOT_FOUND';
            message = 'User not found';
        }

        return res.status(status).json({ code, message });
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const deleted = await userService.deleteUser(id);

        return res.status(200).json({
            code: "USER_DELETED_SUCCESSFULLY",
            message: "User deleted successfully",
            data: deleted
        });
    } catch (error) {
        console.error('Error in userController.deleteUser():', error);
        
        var status = 500;
        var code = 'DELETE_FAILED';
        var message = 'Unexpected error';

        if (error.message === 'USER_NOT_FOUND') {
            status = 404;
            code = 'USER_NOT_FOUND';
            message = 'User not found';
         }

         return res.status(status).json({code, message});
    }
}

module.exports = {getAllUsers, createUser, getUserById, updateUser, patchUser, deleteUser};
