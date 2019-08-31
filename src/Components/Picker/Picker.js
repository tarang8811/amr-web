import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
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
    this.props.onChange(value)
  }

  render() {
    const { classes, id, formControlProps, labelText, value } = this.props
    return (
      <FormControl
        {...formControlProps}
        marginTop={2}
        className={formControlProps.className + ' ' + classes.formControlPicker}
      >
        <MuiPickersUtilsProvider utils={LuxonUtils}>
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
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
    )
  }
}

export default withStyles(customInputStyle)(Picker)
