const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    nome: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);