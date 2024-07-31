const HTTP_CODE = require('../config/http-code.config');

const makeError = (code, message, msg_code) => {
  let httpCode = HTTP_CODE['ERROR_' + code];

  let error;
  try {
    code = httpCode.CODE;
    error = {
      httpCode: code,
      message: message || httpCode.MESSAGE,
      msg_code: msg_code
    };
  } catch (error) {
    let err = new RangeError('Given http code is invalid');
    throw err;
  }
  return error;
};

const sendSuccess = (res, result) => {
  let data = {
    'status': HTTP_CODE.SUCCESS_200.CODE,
    'message': HTTP_CODE.SUCCESS_200.MESSAGE,
    'data': !result ? undefined : result.data || result
  };

  res.status(HTTP_CODE.SUCCESS_200.CODE);
  res.json(data);
};

const sendFailer = (req, res, error, errors) => {

  if (!error) {
    error = makeError('500', '', '');
  }

  res.status(error.httpCode || 500);

  let response = {
    'status': error.httpCode || 500,
    'message': error.message,
  };

  if (error.code) {
    response['code'] = error.code;
  }
  if (errors) {
    response['errors'] = errors;
  }

  res.json(response);
};

module.exports = {
  sendSuccess,
  sendFailer,
  makeError,
}