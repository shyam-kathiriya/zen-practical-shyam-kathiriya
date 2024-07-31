import React from 'react';

// EXTERNAL LIBRARY
import { useField, useFormikContext } from 'formik';
import { TextField } from '@mui/material';

const Input = (props) => {

  const { name, size = 'small', variant = "outlined", label, onChange, renderMenuItems, ...rest } = props;
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  return (
    <TextField
      {...rest}
      {...field}
      fullWidth={true}
      size={size}
      variant={variant}
      label={label}
      onChange={(e) => {
        if (onChange)
          onChange(e);
        setFieldTouched(name, true);
        setFieldValue(name, e.target.value);
      }}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    >
      {rest.select && renderMenuItems && renderMenuItems()}
    </TextField>
  );
}

export default Input;
