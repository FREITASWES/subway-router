const yup = require('yup');

const userSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    role_id: yup.string().required('Role ID is required'),
    contact: yup.object({
        phone: yup.string(),
        email: yup.string().email().required('Email required')
    }).required(),
    address: yup.object({
        street: yup.string(),
        city: yup.string(),
        country: yup.string(),
        postal_code: yup.string(),
        state: yup.string()
    }),
    date_of_birth: yup.date().nullable(),
    gender: yup.string().oneOf(['male', 'female', 'other']).nullable(),
    nationality: yup.string().nullable(),
    languages: yup.string().nullable()
});

async function validateUser(req, res, next) {
    try {
        await userSchema.validate(req.body, {abortEarly: false});
        next();
    } catch (err) {
        console.error("Erro de validação em validateUser:", err.errors);
        return res.status(400).json({
            error: 'Validation error',
            messages: err.errors,
            code: 'VALIDATION_ERROR'
        });
    }
}

module.exports = validateUser;
