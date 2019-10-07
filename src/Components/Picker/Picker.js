import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from '@material-ui/pickers'
import FormControl from '@material-ui/core/FormControl'
import withStyles from '@material-ui/core/styles/withStyles'
import classNames from 'classnames'
import customInputStyle from 'Components/CustomInput/CustomInputStyles'
import LuxonUtils from '@date-io/luxon'
import { DateTime } from 'luxon'

class Picker extends Component {
  static propTypes = {
    id: PropTypes.string,
    labelText: PropTypes.string,
    inputHtmlName: PropTypes.string,
    onChange: PropTypes.func,
    data: PropTypes.array,
    selectedFlight: PropTypes.object
  }

  state = { date: null }

  onChange = date => {
    this.props.onChange(date.toFormat('yyyy-MM-dd'))
  }

  onChangeTime = date => {
    this.props.onChange(date.toFormat('HH:mm'))
  }

  render() {
    const {
      classes,
      id,
      formControlProps,
      labelText,
      value,
      type = 'date',
      shouldDisableDate = () => {},
      helperText = '',
      disabled = false,
      disablePast = false
    } = this.props

    const underlineClasses = classNames({
      [classes.underline]: true
    })
    return (
      <FormControl
        {...formControlProps}
        marginTop={2}
        className={formControlProps.className + ' ' + classes.formControlPicker}
      >
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          {type === 'date' ? (
            <DatePicker
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id={id}
              disablePast={disablePast}
              label={labelText}
              value={value ? DateTime.fromSQL(value) : null}
              shouldDisableDate={shouldDisableDate}
              onChange={this.onChange}
              disabled={disabled}
              helperText={helperText}
              InputProps={{ underline: underlineClasses }}
            />
          ) : (
            <TimePicker
              variant="inline"
              margin="normal"
              ampm={false}
              id={id}
              mask="__:__ _M"
              label={labelText}
              value={value ? DateTime.fromSQL(value) : null}
              onChange={this.onChangeTime}
            />
          )}
        </MuiPickersUtilsProvider>
      </FormControl>
    )
  }
}

export default withStyles(customInputStyle)(Picker)
