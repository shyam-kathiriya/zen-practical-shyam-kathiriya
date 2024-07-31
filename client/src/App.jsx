import React from 'react';

// external libraries
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

// containers
import InvoiceView from './containers/InvoiceView';

export default function App() {

  return <div>
    <CssBaseline />
    <SnackbarProvider autoHideDuration={3000} />
    <InvoiceView />
  </div>
}
