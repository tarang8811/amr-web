import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'Components/Grid/GridItem'
import GridContainer from 'Components/Grid/GridContainer'
import Card from 'Components/Card/Card'
import CardHeader from 'Components/Card/CardHeader'
import CardBody from 'Components/Card/CardBody'
import styles from './ViewTicketStyles'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TicketActions from 'Redux/TicketRedux'
import Button from 'Components/CustomButtons/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CustomInput from 'Components/CustomInput/CustomInput'
import Divider from '@material-ui/core/Divider'
import { pathOr } from 'ramda'
import Typography from '@material-ui/core/Typography'
import { DateTime } from 'luxon'
import { Grid } from '@material-ui/core'
import ReactToPrint from 'react-to-print'
import PreviewTicket from './PreviewTicket'
class ViewTicket extends Component {
  static propTypes = {
    classes: PropTypes.object
  }

  state = {
    radioValue: 'yes',
    displayPrice: '',
    origin: '',
    destination: '',
    originCode: '',
    destinationCode: '',
    id: '',
    flightNumber: '',
    arrivalTime: '',
    departureTime: '',
    passengers: [],
    importantNote: '',
    date: ''
  }

  componentDidMount() {
    const data = pathOr(null, ['data'], this.props.location.state)
    if (data) {
      const {
        id,
        origin,
        destination,
        originCode,
        destinationCode,
        flightNumber,
        arrivalTime,
        departureTime,
        passengers,
        refundable,
        date,
        amount,
        pnr
      } = data

      this.setState({
        date,
        displayPrice: amount,
        id,
        origin,
        destination,
        originCode,
        destinationCode,
        flightNumber,
        arrivalTime,
        departureTime,
        passengers,
        importantNote: refundable
          ? 'This ticket is partially  redundable'
          : 'This ticket is non-redundable and non changeable',
        pnr
      })
    }
  }

  toggleDisplayPrice = e => {
    this.setState({ radioValue: e.target.value })
  }

  onUpdate = key => value => {
    this.setState({ [key]: value })
  }

  printTicket = () => {}

  render() {
    const { classes } = this.props

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>View Ticket</h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem
                  container
                  alignItems="center"
                  justify="center"
                  xs={12}
                  sm={12}
                  md={2}
                >
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        color="primary"
                        onClick={this.printTicket}
                        fullWidth
                      >
                        Print
                      </Button>
                    )}
                    content={() => this.componentRef}
                  />
                </GridItem>
                <GridItem
                  container
                  direction="row"
                  xs={12}
                  sm={12}
                  md={6}
                  alignItems="center"
                  justify="center"
                >
                  <CustomInput
                    labelText="Display Price"
                    id="displayPrice"
                    formControlProps={{
                      className: classes.customInput
                    }}
                    inputProps={{
                      type: 'number',
                      disabled: this.state.radioValue !== 'yes'
                    }}
                    onChange={this.onUpdate('displayPrice')}
                    value={this.state.displayPrice}
                  />
                  <RadioGroup
                    aria-label="display-radio"
                    name="display-radio"
                    className={classes.group}
                    value={this.state.radioValue}
                    onChange={this.toggleDisplayPrice}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio color="primary" />}
                      label="Yes"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="primary" />}
                      label="No"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <PreviewTicket
            ref={ref => (this.componentRef = ref)}
            classes={classes}
            data={this.state}
          />
        </GridItem>
      </GridContainer>
    )
  }
}

const mapStateToProps = state => ({
  tickets: state.ticket.listData
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTickets: TicketActions.ticketsListRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ViewTicket)
