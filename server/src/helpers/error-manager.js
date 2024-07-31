const ERRORS = require("../config/errors")
const { makeError } = require("./http-response")

const getHttpError = (key, message = '') => {
  const error = ERRORS[key];
  if (!error) {
    const e = new ReferenceError('Provided Error is not found in error object');
    throw e;
  }
  return makeError(error.HTTP_CODE, message || error.MESSAGE, error.CODE);
}


module.exports = { getHttpError }