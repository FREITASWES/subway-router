const userRepository = require("../repositories/userRepository");
const roleRepository = require("../repositories/roleRepository");
const bcrypt = require('bcrypt');

async function getUsers() {
    return await userRepository.findAllUsers();
}

async function getUserById(id) {
    const user = await userRepository.findUserById(id);
    if(!user) {
        const error = new Error('USER_NOT_FOUND');
        throw error;
    }

    return user;
}

async function createUser(userData) {
    try {
        const {username, email, password, role_id, contact, address, date_of_birth, gender, nationality, languages } = userData;

        const existingUser = await userRepository.findByEmail(email);
        if(existingUser) {
            const error = new Error('EMAIL_ALREADY_EXISTS');
            throw error;
        }

        const roleExists = await roleRepository.findById(role_id);
        if(!roleExists) {
            const error = new Error('ROLE_NOT_FOUND');
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userRepository.createUser({
            username,
            email,
            password: hashedPassword,
            role_id,
            contact,
            address,
            date_of_birth,
            gender,
            nationality,
            languages        
        });

        if(!newUser) throw new Error('USER_CREATION_FAILED');
        return newUser;

    } catch (error) {
        console.error('Erro dentro do userService.createUser():', error);
        throw error;
    }
}

async function updateUser(id, newData) {
    try {
        const existingUser = await userRepository.findUserById(id);
        if(!existingUser) throw new Error('USER_NOT_FOUND');

        if(newData.password) {
            newData.password = await bcrypt.hash(newData.password, 10);
        }
        const updatedUser = await userRepository.updateUserById(id, newData);
        if(updatedUser) {
            updatedUser.password = undefined;
        }
        return updatedUser;
    } catch (error) {
        console.error('Error in userService.updateUser():', error);
        throw error;
    }
}

async function patchUser(id, data) {
    try {
        const user = await userRepository.findUserById(id);
        if(!user) throw new Error('USER_NOT_FOUND');

        const patched = await userRepository.patchUserById(id, data);
        if(patched) patched.password = undefined;

        return patched;
    } catch (error) {
        console.error('Error in userService.patchUser():', error);
        throw error;
    }
}

async function deactivate(id) {
    try {
        const user = await userRepository.findUserById(id);
        if(!user) throw new Error('USER_NOT_FOUND');
        const deactivated = await userRepository.deactivateUser(id);
        return deactivated;
    } catch (error) {
        console.error('Error in UserService.deactivateUser():', error);
        throw error;
    }
}

async function deleteUser(id) {
    try {
        const user = await userRepository.findUserById(id);
        if (!user) throw new Error('USER_NOT_FOUND');

        const deleted = await userRepository.deleteUser(id);
        return deleted;
        
    } catch (error) {
        console.error('Error in userService.deleteUser():', error);
        throw error;
    }
}

module.exports = {getUsers, createUser, getUserById, updateUser, patchUser, deactivate, deleteUser};
