const AppError = require('../utils/AppError');



const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `${value} Exist. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `${errors.join('. ')}`;
    return new AppError(message, 400);
  };

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);
const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again.', 401);


const errorHandler = (err, req, res, next) => {
    console.log(err,'====error====')
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);

    if (err.isOperational) {
        return res.status(err.statusCode || 500).json({
            status: 'error',
            message: err.message,
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
    });
};

module.exports = errorHandler;
