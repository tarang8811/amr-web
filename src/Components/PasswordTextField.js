import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from 'Components/AmrTextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class PasswordTextField extends Component {
  state = { showPassword: false, password: '' };

  onChange = value => {
    this.props.onChange(value);
  };

  onClick = _ => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  onMouseDown = event => {
    event.preventDefault();
  };

  render() {
    return (
      <TextField
        type={this.state.showPassword ? 'text' : 'password'}
        label="Password"
        value={this.state.password}
        onChange={this.onChange}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="toggle password visibility"
                onClick={this.onClick}
                onMouseDown={this.onMouseDown}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  }
}

export default PasswordTextField;
