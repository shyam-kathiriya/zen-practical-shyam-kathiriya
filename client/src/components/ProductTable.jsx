import React, { Fragment, useEffect, useState } from 'react';

// external library
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';

// utils
import ApiCall from '../utils/Apicall';
import Constants from '../utils/Constants';
import { replaceDoubleBraces } from '../utils/Helpers';

// options
import { options } from './productTableOptions';
import ConfirmationModal from './ConfirmationModal';

const ProductTable = (props) => {

  const { productOptions, data, onInvoiceSubmit, setData } = props;

  const [tableForm, setTableForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [confirmationInfo, setConfirmationInfo] = useState(null);
  const [rows, setRows] = useState(data);

  const [editRowId, setEditRowId] = useState(null);

  useEffect(() => {
    setRows([...data]);
  }, [data]);

  const startEdit = (row) => {
    setEditRowId(row.invcd_fk_prdct_id);
    setTableForm(prev => ({ ...prev, [row.invcd_fk_prdct_id]: row }));
  };

  const handleProductChange = async (id) => {
    try {
      let res = await ApiCall({ url: replaceDoubleBraces(Constants.API_ENDPOINTS.PRODUCT_DETAILS, { id }) });
      if (res && res.status == 200) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleEditCell = async (e, row, columnKey) => {
    const clonedFrom = { ...tableForm };
    if (columnKey == 'invcd_fk_prdct_id') {
      clonedFrom[e.target.value] = clonedFrom[editRowId];
      clonedFrom[editRowId] = undefined;
      clonedFrom[e.target.value][columnKey] = e.target.value;
      setEditRowId(e.target.value);
      const prdctData = await handleProductChange(e.target.value);
      clonedFrom[row.invcd_fk_prdct_id]['invcd_prdct_name'] = prdctData.prdct_name;
      clonedFrom[row.invcd_fk_prdct_id]['invcd_prdct_rate'] = prdctData.prdct_rate;
      clonedFrom[row.invcd_fk_prdct_id]['invcd_prdct_unit'] = prdctData.prdct_unit;
    } else {
      clonedFrom[row.invcd_fk_prdct_id][columnKey] = e.target.value;
    }

    clonedFrom[row.invcd_fk_prdct_id]['invcd_net_amount'] = (clonedFrom[row.invcd_fk_prdct_id]['invcd_prdct_rate'] - (clonedFrom[row.invcd_fk_prdct_id]['invcd_prdct_rate'] * clonedFrom[row.invcd_fk_prdct_id]['invcd_discount'] / 100))?.toFixed(2);
    clonedFrom[row.invcd_fk_prdct_id]['invcd_total_amount'] = (clonedFrom[row.invcd_fk_prdct_id]['invcd_net_amount'] * clonedFrom[row.invcd_fk_prdct_id]['invcd_qty'])?.toFixed(2);
    setTableForm(clonedFrom);
  };

  const customCellRenderer = (row, column, rowIndex) => {
    if (!(column.isEditable && row.invcd_fk_prdct_id == editRowId) && tableForm[row.invcd_fk_prdct_id] && tableForm[row.invcd_fk_prdct_id][column.key]) return tableForm[row.invcd_fk_prdct_id][column.key];

    let colKey = column.editType == 'select' ? column.valueKey : column.key;

    return (column.isEditable && row.invcd_fk_prdct_id == editRowId) ? (
      <TextField
        type={column.editType}
        select={column.editType == 'select'}
        size="small"
        variant="outlined"
        fullWidth={true}
        sx={{width: '124px'}}
        value={tableForm[row.invcd_fk_prdct_id] && tableForm[row.invcd_fk_prdct_id][colKey] || row[colKey]}
        onChange={(e) => handleEditCell(e, row, colKey)}
      >
        {column.editType == 'select' && productOptions?.map(option => (
          <MenuItem key={option.value} value={option.value} disabled={!!rows.find(a => a.invcd_fk_prdct_id == option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    ) : row[column.key];
  };

  const actionClick = (action, row) => {
    switch (action.type) {
      case Constants.TABLE_EVENTS.EDIT:
        startEdit(row);
        break;
      case Constants.TABLE_EVENTS.DELETE: {
        setShowModal(true);
        setConfirmationInfo({
          title: action.confirmationTitle,
          message: action.confirmationMessage,
          data: { row, action },
        })
        break;
      }
      default:
        console.log('No Action Match')
    }
  }

  const handleSaveRowData = (row) => {
    const newRows = rows.map((_r) => (_r.invcd_fk_prdct_id === row.invcd_fk_prdct_id ? { ...row } : _r));
    setRows(newRows);
    setData(newRows);
    setEditRowId(null);
  }

  const confirmationCallback = (data) => {
    const newRows = rows.filter(row => data?.row.invcd_fk_prdct_id !== row.invcd_fk_prdct_id)
    setRows(newRows);
    setData(newRows);
    setShowModal(false);
  }

  const confirmationClose = () => { setShowModal(false) }

  return (
    <>
      {showModal && <ConfirmationModal
        show={showModal}
        onClose={confirmationClose}
        confirmationInfo={confirmationInfo}
        onConfirm={confirmationCallback}
      />}

      <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
        <CardHeader title={options.title} />

        <CardContent>
          <TableContainer  sx={{ height: 440, p: '12px', }}>
            <Table sx={{ minWidth: 650 }} stickyHeader >
              <TableHead>
                <TableRow>
                  <TableCell >Sr. No</TableCell>
                  {
                    options.columns.map(col => (
                      <TableCell key={col.id}>{col.header}</TableCell>
                    ))
                  }
                  {options.tableOptions.actionsThead && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length ? rows.map((row, rowIndex) => (
                  <TableRow
                    key={row.invcd_fk_prdct_id}
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0
                      },
                      boxShadow: row.isEdit
                        ? '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
                        : 'none'
                    }}
                  >
                    <TableCell key='sr_cell'>{rowIndex + 1}</TableCell>
                    {options.columns.map(column => (<TableCell key={column.id}>{customCellRenderer(row, column, rowIndex)}</TableCell>))}

                    {options.tableOptions.actionsThead && <TableCell>
                      {
                        row.invcd_fk_prdct_id == editRowId
                          ? <div>
                            <IconButton
                              color={'info'}
                              variant="contained"
                              onClick={() => {
                                handleSaveRowData(row);
                              }}
                            >
                              <SaveIcon />
                            </IconButton>
                          </div>

                          : <div>
                            {options?.actions?.map((action, index) => {
                              return (
                                <Fragment key={index}>
                                  <IconButton
                                    color={action.iconColor}
                                    variant="contained"
                                    onClick={() => {
                                      actionClick(action, row);
                                    }}
                                  >
                                    {action?.icon}
                                  </IconButton>
                                </Fragment>
                              )
                            })}
                          </div>
                      }
                    </TableCell>}
                  </TableRow>
                )) : <TableRow key={'no_data'}>
                  <TableCell colSpan={10} align='center'>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Typography variant='h5'>No products added</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      
        <Divider />
        <CardActions sx={{ justifyContent: 'center', py: 3 }}>
          <Button variant='contained' onClick={() => onInvoiceSubmit(rows)} sx={{ width: '80%' }} disabled={rows.length < 1 || !!editRowId}>
            Submit
          </Button>
        </CardActions>

      </Card>
    </>
  );
};

export default ProductTable;
