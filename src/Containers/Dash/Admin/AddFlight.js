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
import Picker from 'Components/Picker/Picker'
import styles from 'Containers/Dash/Tickets/AddTicketStyles'
import { pathOr } from 'ramda'

const ActiveArray = [
  { value: true, displayName: 'Active' },
  { value: false, displayName: 'InActive' }
]

class AddFlight extends Component {
  static propTypes = {
    classes: PropTypes.object,
    flights: PropTypes.array
  }

  constructor(props) {
    super()
    this.state = {
      id: null,
      origin: '',
      destination: '',
      originCode: '',
      destinationCode: '',
      arrivalTime: null,
      departureTime: null,
      flightNumber: '',
      isActive: ActiveArray[0]
    }

    const data = pathOr(null, ['data'], props.location.state)
    if (data) {
      const {
        id,
        origin,
        destination,
        originCode,
        destinationCode,
        arrivalTime,
        departureTime,
        flightNumber,
        isActive
      } = data
      this.state = {
        id: id,
        origin,
        destination,
        originCode,
        destinationCode,
        arrivalTime,
        departureTime,
        flightNumber,
        isActive: isActive ? ActiveArray[0] : ActiveArray[1]
      }
    }
  }

  onSave = () => {
    if (this.state.id) {
      this.props.updateTicket(this.state.id, {
        ...this.state,
        refundable: this.state.isActive.value,
        originCode: this.state.originCode.toUpperCase(),
        destinationCode: this.state.destinationCode.toUpperCase()
      })
    } else {
      this.props.createTicket({
        ...this.state,
        refundable: this.state.isActive.value,
        originCode: this.state.originCode.toUpperCase(),
        destinationCode: this.state.destinationCode.toUpperCase()
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
                  {this.state.id ? 'Update Flight' : 'Add Flight'}
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Add flight details to your portal
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Origin"
                      id="origin"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.onUpdate('origin')}
                      value={this.state.origin}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Destination"
                      id="destination"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.onUpdate('destination')}
                      value={this.state.destination}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Origin Code"
                      id="originCode"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.onUpdate('originCode')}
                      value={this.state.originCode}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Destination Code"
                      id="destinationCode"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.onUpdate('destinationCode')}
                      value={this.state.destinationCode}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Picker
                      id="add-flight-departure-time"
                      labelText="Departure Time"
                      value={this.state.departureTime}
                      formControlProps={{
                        fullWidth: true
                      }}
                      type="time"
                      onChange={this.onUpdate('departureTime')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Picker
                      id="add-flight-arrival-time"
                      labelText="Arrival Time"
                      value={this.state.arrivalTime}
                      formControlProps={{
                        fullWidth: true
                      }}
                      type="time"
                      onChange={this.onUpdate('arrivalTime')}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Flight Number"
                      id="flightNumber"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.onUpdate('flightNumber')}
                      value={this.state.flightNumber}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <AmrSelect
                      id="add-flight-active"
                      labelText="Active?"
                      inputHtmlName="add-flight-active"
                      onChange={this.onUpdate('isActive')}
                      selectedObject={this.state.isActive}
                      data={ActiveArray}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.onSave}>
                  {this.state.id ? 'Update Flight' : 'Add Flight'}
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createFlight: FlightActions.flightsCreateRequest,
      updateFlight: FlightActions.flightsUpdateRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddFlight)
