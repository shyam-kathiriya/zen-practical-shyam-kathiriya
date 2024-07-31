const HTTPCODE = {
  'SUCCESS_200': { 'CODE': 200, 'MESSAGE': 'OK' },
  'ERROR_400': { 'CODE': 400, 'MESSAGE': 'Bad Request' },
  'ERROR_401': { 'CODE': 401, 'MESSAGE': 'Unauthorized' },
  'ERROR_402': { 'CODE': 402, 'MESSAGE': 'Payment Required' },
  'ERROR_403': { 'CODE': 403, 'MESSAGE': 'Forbideen' },
  'ERROR_404': { 'CODE': 404, 'MESSAGE': 'Not Found' },
  'ERROR_405': { 'CODE': 405, 'MESSAGE': 'Method Not Allowed' },
  'ERROR_409': { 'CODE': 409, 'MESSAGE': 'Data conflict' },
  'ERROR_413': { 'CODE': 413, 'MESSAGE': 'Request Entity Too Large' },
  'ERROR_422': { 'CODE': 422, 'MESSAGE': 'Unprocessable entity' },
  'ERROR_500': { 'CODE': 500, 'MESSAGE': 'Internal Server Error' },
  'ERROR_504': { 'CODE': 504, 'MESSAGE': 'Timeout' }
};

module.exports = HTTPCODE;
