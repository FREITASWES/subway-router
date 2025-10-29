const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,        
    },
    contact_info: {
        phone: {
            type: String, 
            required: true,        
        },
    email: {
        type: String,
        required: true,
    },
},
address: {
    street: {
        type: String, 
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip_code: {
        type: String,
        required: true,
    },
},
website: {
    type: String,
    },
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;
