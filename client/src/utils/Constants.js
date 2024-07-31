
const LOCAL_API_URL = 'http://localhost:8000/api/v1';

const BASE_URL = LOCAL_API_URL;

const API_ENDPOINTS = {
  PRODUCT_LIST: BASE_URL + '/product/lookup',
  PRODUCT_DETAILS: BASE_URL + '/product/{{id}}',
  INVOICE: BASE_URL + '/invoice',
}

const TABLE_EVENTS = {
  EDIT: 'EDIT',
  DELETE: 'DELETE',
}

const Constants = {
  API_ENDPOINTS,
  TABLE_EVENTS
}

export default Constants
