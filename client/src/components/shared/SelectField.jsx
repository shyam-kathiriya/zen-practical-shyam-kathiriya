import React from 'react';

// external library
import { useField, useFormikContext } from 'formik';
import { MenuItem, TextField } from '@mui/material';

const SelectField = (props) => {

  const { name, size = 'small', variant = "outlined", label, onChange, options, ...rest } = props;
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  function renderMenuItems() {
    return options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))
  }

  return (
    <TextField
      {...rest}
      {...field}
      fullWidth={true}
      size={size}
      select={true}
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
      {renderMenuItems()}
    </TextField>
  );
}

export default SelectField;
