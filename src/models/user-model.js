const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    phone: {type: String},
    email: {type: String, required: true}
}, {_id: false});

const addressSchema = new mongoose.Schema({
    street: {type: String},
    city: {type: String},
    country: {type: String},
    postal_code: {type: String},
    state: {type: String},
}, {_id: false});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role_id: {type: String, required: true},
    contact: contactSchema,
    address: addressSchema,
    date_of_birth: {type: Date},
    gender: {type: String},
    nationality: {type: String},
    languages: {type: String},
    active: {type: Boolean, default: true},
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

userSchema.index({'contact.email': 1}, {unique: true});

module.exports = mongoose.model('User', userSchema);
