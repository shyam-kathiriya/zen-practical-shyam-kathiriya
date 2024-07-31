import React, { Fragment } from 'react';

// external library
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmationModal = ({ show, onClose, confirmationInfo, onConfirm }) => {

  return (
    <Fragment>
      <Dialog
        open={show}
        fullWidth={true}
        maxWidth='sm'
        onClose={onClose}
      >
        <DialogTitle>
          {confirmationInfo.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmationInfo.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant='outlined'>Cancel</Button>
          <Button onClick={() => onConfirm(confirmationInfo?.data)} variant='contained' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}


export default ConfirmationModal;