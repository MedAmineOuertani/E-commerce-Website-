const ErroHandler = require('../utils/errorHandler');
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = err;
        res.status(error.statusCode).json({
            success: false,
            message: error.message
        });
    }

};