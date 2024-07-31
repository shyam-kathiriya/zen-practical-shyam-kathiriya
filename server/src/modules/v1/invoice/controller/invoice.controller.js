const httpResponse = require('../../../../helpers/http-response');
const invoiceService = require('../services/invoice.service');

const addInvoice = async (req, res) => {
  try {
    const data = Object.assign({}, req.body);
    const response = await invoiceService.addInvoice(data);
    httpResponse.sendSuccess(res, response);
  } catch (err) {
    httpResponse.sendFailer(req, res, err, null);
  }
}

module.exports = {
  addInvoice,
};