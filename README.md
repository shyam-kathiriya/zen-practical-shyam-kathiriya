# Zen Practical Test

## Project Overview

This project involves creating a form-based web application to manage invoices, including product details, customer information, and calculations for net and total amounts. The application will use data from a `products` table and will save invoices into `invoices` and `invoice_detaiils` tables.

## Form Design

### Fields

- **Customer Name**: Textbox for user-defined input.
- **Product**: Dropdown list populated from `products` table.
- **Rate**: Auto-fetched based on the selected product.
- **Unit**: Auto-fetched based on the selected product.
- **Qty.**: User-defined textbox for input.
- **Discount (%)**: User-defined textbox for input.
- **Net Amount**: Auto-calculated as `Rate - (Discount% of Rate)`.
- **Total Amount**: Auto-calculated as `Net Amount * Qty`.

### Actions

- **Add Button**: Adds the entered product details to a grid. Records are not stored in the database until the final save button is pressed.
- **Grid Options**: 
  - Update record by changing values.
  - Remove record by clicking the remove link.
- **Submit Button**: Saves data in the database.

## Database Schema

### products

- **prdct_id**: Primary Key
- **prdct_name**
- **prdct_rate**
- **prdct_unit**

### invoices

- **invc_id**: Primary Key (uuid)
- **invc_no**: Last Invoice No + 1
- **invc_date**: Current Date
- **invc_customer_name**: User-entered name
- **invc_total_amount**: Sum of Total Amounts of all products added

### invoice_details

- **invcd_id**: Primary Key (uuid)
- **invcd_fk_invoice_Id**: Reference ID inserted in `invoices`
- **invcd_fk_prdct_id**: ID of the selected product
- **invcd_rate**: As per data added in form
- **invcd_unit**: As per data added in form
- **invcd_qty**: As per data added in form
- **invcd_discount**: As per data added in form
- **invcd_net_amount**: As per data added in form
- **invcd_total_amount**: As per data added in form

### sequences

- **type**: Primary Key
- **sequence** Latest count of the sequence

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shyam-kathiriya/zen-practical-shyam-kathiriya.git
   cd zen-practical-test

2. **To run Client Application**:
   ```bash
   cd ./client
   npm start

3. **To run Server Application**:
   ```bash
   cd ./server
   npm start
