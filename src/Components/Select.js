import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import withStyles from '@material-ui/core/styles/withStyles'
import classNames from 'classnames'
import customInputStyle from 'Components/CustomInput/CustomInputStyles'

class AmrSelect extends Component {
  static propTypes = {
    id: PropTypes.string,
    labelText: PropTypes.string,
    inputHtmlName: PropTypes.string,
    onChange: PropTypes.func,
    data: PropTypes.array,
    selectedFlight: PropTypes.object
  }

  onChange = e => {
    const value = e.target.value
    if (value) {
      this.props.onChange(this.props.data.find(d => d.value === value))
    } else {
      this.props.onChange({ displayName: '', value: null })
    }
  }

  render() {
    const {
      classes,
      id,
      formControlProps,
      labelProps,
      labelText,
      error,
      success
    } = this.props
    const labelClasses = classNames({
      [' ' + classes.labelRootError]: error,
      [' ' + classes.labelRootSuccess]: success && !error
    })
    const underlineClasses = classNames({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true
    })

    const value = this.props.selectedObject
      ? this.props.selectedObject.value
      : null

    const data = [...this.props.data, { value: null, displayName: 'None' }]

    return (
      <FormControl
        {...formControlProps}
        className={formControlProps.className + ' ' + classes.formControl}
      >
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
        <Select
          value={value}
          onChange={this.onChange}
          inputProps={{
            name: this.props.inputHtmlName,
            id: this.props.id
          }}
          classes={{ underline: underlineClasses }}
        >
          {data.map(d => (
            <MenuItem value={d.value}>{d.displayName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

export default withStyles(customInputStyle)(AmrSelect)
