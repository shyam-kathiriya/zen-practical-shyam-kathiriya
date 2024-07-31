import { enqueueSnackbar } from "notistack";

export const replaceDoubleBraces = (str, result) => {
  Object.keys(result).forEach(key => {
    if (result[key] === undefined) {
      result[key] = '';
    }
  });

  const modifiedString = str.replace(/{{(.+?)}}/g, (_, g1) => `${result[g1]}` || g1);
  return modifiedString.replace(/\[missing /g, '').replace(/ value\]/g, '');
};

export const toastSuccess = ({ message, }) => {
  enqueueSnackbar(message, { variant: 'success' })
}