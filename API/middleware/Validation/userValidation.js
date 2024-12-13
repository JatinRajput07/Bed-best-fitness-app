const Joi = require('joi');

exports.registrationValidation = (req, res, next) => {
    let schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'host', 'user').optional(),
        googleId: Joi.string().optional(),
        device_token: Joi.string().optional(),
        device_type: Joi.string().optional(),
    });

    if (req.body.role === 'host') {
        schema = schema.keys({
            joiningDate: Joi.date().required(),
            batchNo: Joi.string().required(),
            address: Joi.string().required(),
            ADS_id: Joi.string().required(),
        });
    }

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ status: 'error', message: error.details[0].message });
    }
    next();
};
