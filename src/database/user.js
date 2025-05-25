const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    nome: String,
    email: String
});

module.export = mongoose.model('User', userSchema);