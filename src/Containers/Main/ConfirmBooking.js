// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Card from 'Components/Card/Card'
import CardBody from 'Components/Card/CardBody'
import CardFooter from 'Components/Card/CardFooter'
import CardHeader from 'Components/Card/CardHeader'
import Button from 'Components/CustomButtons/Button'
import CustomInput from 'Components/CustomInput/CustomInput'
import GridContainer from 'Components/Grid/GridContainer'
// core components
import GridItem from 'Components/Grid/GridItem'
import AmrSelect from 'Components/Select'
import ConfirmBookingHeader from 'Containers/Main/ConfirmBookingHeader'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import PropTypes from 'prop-types'
import { update } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import BookingActions from 'Redux/BookingRedux'
import { ConcatPassengerName } from 'Transforms/Passengers'
import { flatten } from 'ramda'

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  userProfileGrid: {
    margin: '0 auto'
  },
  avatar: {
    width: '60px',
    height: '60px'
  },
  card: {
    marginTop: '50px'
  }
}

const titles = [
  { displayName: 'Mr.', value: 'Mr.' },
  { displayName: 'Ms.', value: 'Ms.' }
]

class ConfirmBooking extends React.Component {
  constructor(props) {
    super()
    const { seats } = props.location.state.data
    this.state = {
      titles: [...Array(seats).keys()].map(k => null),
      firstNames: [...Array(seats).keys()].map(k => ''),
      lastNames: [...Array(seats).keys()].map(k => ''),
      readyToSubmit: false
    }
  }

  onUpdate = (key, index) => value => {
    this.setState(
      { [key]: update(index, value, this.state[key]) },
      this.handleStateUpdate
    )
  }

  handleStateUpdate = () => {
    const flattenedArray = flatten([
      this.state.titles,
      this.state.firstNames,
      this.state.lastNames
    ])
    const filteredArray = flattenedArray.filter(v => !!v)
    // contins no null or empty values
    const readyToSubmit = filteredArray.length === flattenedArray.length
    this.setState({ readyToSubmit })
  }

  confirmBooking = () => {
    const { seats, flight, id } = this.props.location.state.data
    this.props.createBooking({
      passengers: [...Array(seats).keys()].map(k =>
        ConcatPassengerName({
          title: this.state.titles[k].value,
          firstName: this.state.firstNames[k].value,
          lastName: this.state.lastNames[k]
        })
      ),
      seats: seats,
      ticket: { id },
      flight: { id: flight.id }
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <GridContainer alignItems="center" justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <ConfirmBookingHeader data={this.props.location.state.data} />
            <Card className={classes.card}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Add Passenger Details
                </h4>
              </CardHeader>
              <CardBody>
                {[...Array(this.props.location.state.data.seats).keys()].map(
                  k => (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <AmrSelect
                          id={`passenger-booking-${k}`}
                          labelText="Title"
                          inputHtmlName={`passenger-booking-${k}`}
                          onChange={this.onUpdate('titles', k)}
                          selectedObject={this.state.titles[k]}
                          data={titles}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="First Name"
                          id={`passenger-firstName-${k}`}
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={this.onUpdate('firstNames', k)}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Last Name"
                          id={`passenger-lastName-${k}`}
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={this.onUpdate('lastNames', k)}
                        />
                      </GridItem>
                    </GridContainer>
                  )
                )}
              </CardBody>
              <CardFooter>
                <GridItem xs={12} sm={12} md={3}>
                  <Button
                    color="primary"
                    disabled={!this.state.readyToSubmit}
                    color={this.state.readyToSubmit ? 'primary' : 'inactive'}
                    onClick={this.confirmBooking}
                    fullWidth
                  >
                    Confirm Booking
                  </Button>
                </GridItem>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

ConfirmBooking.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createBooking: BookingActions.bookingCreateRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConfirmBooking)
