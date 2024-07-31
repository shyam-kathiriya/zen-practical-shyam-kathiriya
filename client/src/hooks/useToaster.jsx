// external library
import { enqueueSnackbar } from 'notistack';

const useToaster = () => {

  function success(msg = '') {
    enqueueSnackbar(msg, { variant: 'success' })
  }

  function error(msg = '') {
    enqueueSnackbar(msg, { variant: 'error' })
  }

  function info(msg = '') {
    enqueueSnackbar(msg, { variant: 'info' })
  }

  function warning(msg = '') {
    enqueueSnackbar(msg, { variant: 'warning' })
  }


  return {
    success,
    error,
    info,
    warning
  }
}

export default useToaster