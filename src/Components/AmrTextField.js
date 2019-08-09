import React from 'react'
import TextField from '@material-ui/core/TextField'

const AmrTextField = ({
  required = false,
  fullWidth = true,
  id = '',
  label = '=',
  autoComplete = '',
  autoFocus = false,
  name = '',
  value = '',
  onChange,
  type = 'text',
  InputProps
}) => (
  <TextField
    variant="outlined"
    required={required}
    fullWidth={fullWidth}
    id={id}
    label={label}
    name={name}
    autoComplete={autoComplete}
    autoFocus={autoFocus}
    value={value}
    onChange={onChange}
    type={type}
    InputProps={InputProps}
  />
)

export default AmrTextField
