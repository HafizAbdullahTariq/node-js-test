const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
addFormats(ajv);
const {
  FAIL,
  ERROR,
  NOT_FOUND_STATUS_CODE_START,
  ERROR_MESSAGE,
  IS_PROD_ENV,
  IS_DEV_ENV,
  SERVER_ERROR_STATUS_CODE,
} = require('./constants');

// Universal Error Handling
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(NOT_FOUND_STATUS_CODE_START) ? FAIL : ERROR;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Send detailed error to client if it's a simple operational error
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Non-specific catch-all error
  } else {
    console.error(ERROR, err);

    return res.status(SERVER_ERROR_STATUS_CODE).json({
      status: ERROR,
      message: ERROR_MESSAGE,
    });
  }
};

// _ refers to request
const globalErrorHandler = (err, _, res) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || SERVER_ERROR_STATUS_CODE;
  err.status = err.status || ERROR;

  if (IS_DEV_ENV) {
    sendErrorDev(err, res);
  } else if (IS_PROD_ENV) {
    let error = { ...err };
    error.message = err.message;

    // if (error.name === 'CastError') error = handleCastErrorDB(error);
    // if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    // if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const validateAjv = (data, schema) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) return { valid: false, errors: validate.errors };
  return { valid: true };
};

module.exports = { catchAsync, AppError, globalErrorHandler, validateAjv };
