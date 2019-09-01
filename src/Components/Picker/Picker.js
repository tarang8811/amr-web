import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
  DateTimePicker
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

  onChange = (date, value) => {
    console.log(value)
    this.props.onChange(value)
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
      type = 'date'
    } = this.props
    return (
      <FormControl
        {...formControlProps}
        marginTop={2}
        className={formControlProps.className + ' ' + classes.formControlPicker}
      >
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          {type === 'date' ? (
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id={id}
              label={labelText}
              value={value ? DateTime.fromSQL(value) : null}
              onChange={this.onChange}
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
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
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
            />
          )}
        </MuiPickersUtilsProvider>
      </FormControl>
    )
  }
}

export default withStyles(customInputStyle)(Picker)
