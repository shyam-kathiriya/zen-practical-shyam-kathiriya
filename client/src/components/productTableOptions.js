import Constants from "../utils/Constants";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

export const options = {
  title: 'Invoice Items',
  emptyMessage: "No products added ",
  columns: [
    {
      id: 1,
      key: 'invcd_prdct_name',
      header: 'Product Name',
      isEditable: true,
      editType: 'select', 
      valueKey: 'invcd_fk_prdct_id'
    },
    {
      id: 2,
      key: 'invcd_prdct_rate',
      header: 'Rate',
      isEditable: false
    },
    {
      id: 3,
      key: 'invcd_prdct_unit',
      header: 'Unit',
      isEditable: false
    },
    {
      id: 4,
      key: 'invcd_qty',
      header: 'Qty',
      isEditable: true,
      editType: 'number'
    },
    {
      id: 5,
      key: 'invcd_discount',
      header: 'Discount(%)',
      isEditable: true,
      editType: 'number',
    },
    {
      id: 6,
      key: 'invcd_net_amount',
      header: 'Net Amount',
      isEditable: false
    },
    {
      id: 7,
      key: 'invcd_total_amount',
      header: 'Total Amount',
      isEditable: false
    },
  ],
  actions: [
    {
      type: Constants.TABLE_EVENTS.EDIT,
      icon: <CreateIcon />,
      iconColor: 'info'
    },
    {
      type: Constants.TABLE_EVENTS.DELETE,
      icon: <DeleteIcon />,
      iconColor: 'error',
      confirmation: true,
      confirmationMessage: 'Are you sure? Want to delete this record?',
      confirmationTitle: 'Delete',
    }
  ],
  tableOptions: {
    actionsThead: true
  },
}
