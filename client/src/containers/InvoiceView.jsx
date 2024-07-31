import React, { useState, useEffect, useRef } from 'react';

// external library
import Container from '@mui/material/Container';
import { Box, Button, Card, CardActions, CardContent, CardHeader, debounce, Divider, Grid } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

// components
import ProductTable from '../components/ProductTable';
import Navbar from '../components/Navbar';
import Input from '../components/shared/Input';
import SelectField from '../components/shared/SelectField';

// utils
import ApiCall from '../utils/Apicall';
import Constants from '../utils/Constants';
import { replaceDoubleBraces } from '../utils/Helpers';

// hooks
import useToaster from '../hooks/useToaster';

const initialValues = {
  invc_customer_name: '',
  invcd_fk_prdct_id: '',
  invcd_prdct_name: '',
  invcd_prdct_rate: 0,
  invcd_prdct_unit: 0,
  invcd_qty: 0,
  invcd_discount: 0,
  invcd_net_amount: 0,
  invcd_total_amount: 0
}

const InvoiceView = () => {

  const [products, setProducts] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);

  const formikRef = useRef(null);

  const { success, error, info } = useToaster();

  useEffect(() => {
    getProductOptions();
  }, [])

  async function getProductOptions() {
    try {
      let res = await ApiCall({ url: Constants.API_ENDPOINTS.PRODUCT_LIST, });
      if (res.status == 200 && res.data?.length) {
        setProducts(res.data.map(prd => ({ label: prd.prdct_name, value: prd.prdct_id })));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const validationSchema = Yup.object().shape({
    invc_customer_name: Yup.string()
      .min(3, 'Customer Name must be between 3 and 30 characters.')
      .max(30, 'Customer Name must be between 3 and 30 characters.')
      .required('Customer Name Required'),
    invcd_fk_prdct_id: Yup.string().required('Product Name Required'),
    invcd_qty: Yup.number()
      .min(1, 'Add minimum 1 Quantity.')
      .required('Quantity Required'),
    invcd_discount: Yup.number()
      .min(0, 'Add minimum 0%.')
      .max(100, 'Add maximum 100 %.')
      .required('Discount Required'),
  });

  const handleProductChange = async (e) => {
    try {
      let res = await ApiCall({ url: replaceDoubleBraces(Constants.API_ENDPOINTS.PRODUCT_DETAILS, { id: e.target.value }) });

      if (res && res.status == 200) {
        formikRef.current.setValues({
          ...formikRef.current.values,
          invcd_prdct_name: res.data.prdct_name,
          invcd_total_amount: 0,
          invcd_qty: 0,
          invcd_discount: 0,
          invcd_prdct_unit: res.data.prdct_unit,
          invcd_prdct_rate: res.data.prdct_rate,
          invcd_net_amount: res.data.prdct_rate,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleQtyChange = debounce((e) => {
    calculateTotalAmount(formikRef.current.values?.invcd_net_amount, e.target.value);
  }, 800)

  const handleDiscountChange = debounce((e) => {
    const netAmount = formikRef.current.values?.invcd_prdct_rate - (formikRef.current.values?.invcd_prdct_rate * e.target.value / 100);
    formikRef.current.setFieldValue('invcd_net_amount', netAmount.toFixed(2));
    calculateTotalAmount(netAmount, formikRef.current.values?.invcd_qty);
  }, 800)

  const calculateTotalAmount = (invcd_net_amount, invcd_qty) => {
    formikRef.current.setFieldValue('invcd_total_amount', (invcd_net_amount * invcd_qty).toFixed(2));
  }

  const onAddInvoiceItem = async (values, helpers) => {
    try {
      const isExists = invoiceItems.find(invc_item => invc_item.invcd_fk_prdct_id == values.invcd_fk_prdct_id);
      if (isExists) return error('Product Already Added');

      setInvoiceItems([...invoiceItems, values]);
      helpers.resetForm({
        values: {
          ...initialValues,
          invc_customer_name: values.invc_customer_name
        },
        errors: {},
        touched: {},
      })
      info('Product Added Successfully.');
    } catch (err) {
      console.log(err)
    }
  };

  const onInvoiceSubmit = async (data) => {
    try {
      if (data.length < 1) return info('Please enter atlease one product.');

      let res = await ApiCall({
        url: Constants.API_ENDPOINTS.INVOICE,
        method: "POST",
        body: {
          invc_customer_name: data[0].invc_customer_name,
          invc_items: data
        }
      });

      if (res.status == 200) {
        success("Invoice added successfully");
        setInvoiceItems([]);
        formikRef.current.resetForm({
          values: initialValues
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onTableDataChange = (data) => {
    setInvoiceItems(data);
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          bgcolor: '#dfdfdf'
        }}
      >
        <Container maxWidth="lg" sx={{ py: '32px', }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onAddInvoiceItem}
            enableReinitialize
            innerRef={formikRef}
          >
            {({ handleSubmit }) => {
              return (
                <>
                  <form onSubmit={handleSubmit}>
                    <Card sx={{ borderRadius: 4 }}>
                      <CardHeader subheader="The information can be edited" title="Generate Invoice" />
                      <Divider />
                      <CardContent>
                        <Grid container spacing={2} sx={{ px: '60px' }}>
                          <Grid md={6} xs={12} item>
                            <Input
                              label="Customer Name"
                              name="invc_customer_name"
                              disabled={!!invoiceItems.length}
                            />
                          </Grid>
                          <Grid md={6} xs={12} item></Grid>
                          <Grid md={6} xs={12} item>
                            <SelectField
                              name="invcd_fk_prdct_id"
                              label="Product Name"
                              onChange={handleProductChange}
                              select={true}
                              options={products}
                            />
                          </Grid>
                          <Grid md={6} xs={12} item></Grid>

                          <Grid md={6} xs={12} item>
                            <Input
                              name="invcd_prdct_rate"
                              label="Rate"
                              variant='standard'
                              disabled
                            />
                          </Grid>
                          <Grid md={6} xs={12} item>
                            <Input
                              name="invcd_prdct_unit"
                              label="Unit"
                              variant='standard'
                              disabled
                            />
                          </Grid>
                          <Grid md={6} xs={12} item>
                            <Input
                              label="Qty"
                              type="number"
                              onChange={handleQtyChange}
                              name="invcd_qty"
                            />
                          </Grid>
                          <Grid md={6} xs={12} item>
                            <Input
                              name="invcd_discount"
                              type="number"
                              label="Discount (%)"
                              onChange={handleDiscountChange}
                            />
                          </Grid>
                          <Grid md={6} xs={12} item>
                            <Input
                              name="invcd_net_amount"
                              label="Net Amount"
                              variant='standard'
                              disabled
                            />
                          </Grid>
                          <Grid md={6} xs={12} item>
                            <Input
                              name="invcd_total_amount"
                              label="Total Amount"
                              variant='standard'
                              disabled
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider />
                      <CardActions sx={{justifyContent: 'center', py: 3}}>
                        <Button
                          type="submit"
                          variant='contained'
                          sx={{ width: '80%' }}
                        >
                          Add
                        </Button>
                      </CardActions>

                    </Card>
                  </form>
                </>
              );
            }}
          </Formik>
        </Container>

        <Container maxWidth="lg" sx={{ mb: '32px' }} >
          <ProductTable
            data={invoiceItems}
            setData={setInvoiceItems}
            productOptions={products}
            onTableDataChange={onTableDataChange}
            onInvoiceSubmit={onInvoiceSubmit}
          />
        </Container>
      </Box >
    </>
  );
}

export default InvoiceView