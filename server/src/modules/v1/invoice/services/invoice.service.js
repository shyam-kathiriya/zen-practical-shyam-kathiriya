
const InvoiceModel = require('../../../../models/invoice.model');
const SequenceModel = require('../../../../models/sequence.model');
const InvoiceDetailsModel = require('../../../../models/invoice_details.model');

const addInvoice = async (data) => {
  const invoiceSequence = await SequenceModel.findOne({ type: 'invc_no' });
  if (!invoiceSequence) invoiceSequence = await SequenceModel.create({ type: 'invc_no', sequence: 1 });

  let invc_no = invoiceSequence.sequence;

  let _data = {
    invc_no,
    invc_customer_name: data.invc_customer_name,
    invc_total_amount: data.invc_items.reduce((acc, curr) => acc + Number(curr?.invcd_total_amount), 0)
  }

  const invoice = await InvoiceModel.create(_data);
  await SequenceModel.updateOne({ type: 'invc_no' }, { $inc: { sequence: 1 } });

  const invcd_data = data.invc_items.map(invcd => ({
    ...invcd,
    invcd_fk_invc_id: invoice.invc_id,
  }))
  await InvoiceDetailsModel.insertMany(invcd_data);

  return;
}

module.exports = {
  addInvoice,
}
