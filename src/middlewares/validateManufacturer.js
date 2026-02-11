const yup = require('yup');

const manufacturerSchema = yup.object({
    name: yup
        .string()
        .required('Manufacturer name is required'),

    contact_info: yup.object({
        phone: yup
            .string()
            .required('Contact phone is required'),
        email: yup
            .string()
            .email('invalid email format')
            .required('Contact email is required'),
    }),

    address: yup.object({
        street: yup
        .string()
        .required('Street is required'),
        number: yup
        .string()
        .required('Number is required'),
        city: yup
        .string()
        .required('City is required'),
        state: yup
        .string()
        .required('State is required'),
        zip_code: yup
        .string()
        .required('Zip code is required')
    }),

    website: yup
    .string()
    .url('Invalid URL format')
});

async function validateManufacturer(req, res, next) {
    try {
        await manufacturerSchema.validate(req.body, {abortEarly: false});
        next();
    } catch (err) {
        return res.status(400).json({
            code: 'VALIDATION_ERROR',
            error: 'Validation error',
            messages: err.errors
        });
    } 
}

module.exports = validateManufacturer;
