import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'Components/Grid/GridItem'
import GridContainer from 'Components/Grid/GridContainer'
import CustomInput from 'Components/CustomInput/CustomInput'
import Button from 'Components/CustomButtons/Button'
import Card from 'Components/Card/Card'
import CardHeader from 'Components/Card/CardHeader'
import CardBody from 'Components/Card/CardBody'
import CardFooter from 'Components/Card/CardFooter'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FlightActions from 'Redux/FlightRedux'
import AmrSelect from 'Components/Select'
import { FormatforAmrSelect } from 'Transforms/Flights'
import Picker from 'Components/Picker/Picker'
import TicketActions from 'Redux/TicketRedux'
import styles from './AddTicketStyles'
import { pathOr } from 'ramda'

const RedundableDataArray = [
  { value: true, displayName: 'Refundable' },
  { value: false, displayName: 'Non-Refundable' }
]

class AddTicket extends Component {
  static propTypes = {
    classes: PropTypes.object,
    flights: PropTypes.array
  }

  constructor(props) {
    super()
    this.state = {
      id: null,
      flight: null,
      totalSeats: 0,
      date: null,
      price: 0,
      refundable: RedundableDataArray[1],
      pnr: '',
      flights: []
    }

    const data = pathOr(null, ['data'], props.location.state)
    if (data) {
      const { id, flight, availableSeats, date, price, refundable, pnr } = data
      this.state = {
        id: id,
        flight: FormatforAmrSelect([flight])[0],
        totalSeats: availableSeats,
        date: date,
        price: price,
        refundable: refundable
          ? RedundableDataArray[0]
          : RedundableDataArray[1],
        pnr: pnr,
        flights: []
      }
    }
  }

  componentDidMount() {
    this.props.getFlights()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.flights !== nextProps.flights) {
      this.setState({ flights: FormatforAmrSelect(nextProps.flights) })
    }
  }

  onSave = () => {
    if (this.state.id) {
      this.props.updateTicket(this.state.id, {
        ...this.state,
        flight: { id: this.state.flight.value },
        refundable: this.state.refundable.value,
        pnr: this.state.pnr.toUpperCase()
      })
    } else {
      this.props.createTicket({
        ...this.state,
        flight: { id: this.state.flight.value },
        refundable: this.state.refundable.value,
        pnr: this.state.pnr.toUpperCase()
      })
    }
  }

  onUpdate = key => value => {
    this.setState({ [key]: value })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <GridContainer alignItems="center" justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  {this.state.id ? 'Update Ticket' : 'Add Ticket'}
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Add tickets to your account
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <AmrSelect
                      id="add-ticket-flight"
                      labelText="Flight"
                      inputHtmlName="add-ticket-flight-form"
                      onChange={this.onUpdate('flight')}
                      selectedObject={this.state.flight}
                      data={this.state.flights}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Picker
                      id="add-ticket-picker"
                      labelText="Date"
                      value={this.state.date}
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.onUpdate('date')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Seats"
                      id="seats"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'number'
                      }}
                      onChange={this.onUpdate('totalSeats')}
                      value={this.state.totalSeats}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="PNR"
                      id="pnr"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.onUpdate('pnr')}
                      value={this.state.pnr}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Price (per seat)"
                      id="price"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'number'
                      }}
                      onChange={this.onUpdate('price')}
                      value={this.state.price}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <AmrSelect
                      id="add-ticket-refundable"
                      labelText="Refundable?"
                      inputHtmlName="add-ticket-flight-refundable"
                      onChange={this.onUpdate('refundable')}
                      selectedObject={this.state.refundable}
                      data={RedundableDataArray}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.onSave}>
                  {this.state.id ? 'Update Ticket' : 'Add Ticket'}
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  flights: state.flight.listData
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFlights: FlightActions.flightsListRequest,
      createTicket: TicketActions.ticketsCreateRequest,
      updateTicket: TicketActions.ticketsUpdateRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddTicket)
