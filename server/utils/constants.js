module.exports = {
  FAIL: 'fail',
  ERROR: 'error',
  NOT_FOUND_STATUS_CODE_START: 4,
  ERROR_MESSAGE: 'An unexpected error occurred.',
  IS_DEV_ENV: (() => process.env.NODE_ENV === 'development')(),
  IS_PROD_ENV: (() => process.env.NODE_ENV === 'production')(),
  SUCCESS_STATUS_CODE: 200,
  BAD_REQUEST_STATUS_CODE: 400,
  BAD_REQUEST_MESSAGE: 'Invalid request payload',
  NOT_FOUND_STATUS_CODE: 404,
  SERVER_ERROR_STATUS_CODE: 500,
};
