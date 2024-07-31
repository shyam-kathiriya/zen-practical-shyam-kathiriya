const middleware = require('../../../../middleware/index');

const invoiceController = require('../controller/invoice.controller');

const { addInvoiceSchema } = require('../validator');

const invoiceRoute = (api) => {
  api.post('/invoice', middleware.commonValidator(addInvoiceSchema), invoiceController.addInvoice);
}


module.exports = invoiceRoute;
