const Joi = require('joi');

exports.registrationValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'host', 'user').optional(),
        googleId: Joi.string().optional(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ status:'error',message: error.details[0].message });
    }
    next();
};
