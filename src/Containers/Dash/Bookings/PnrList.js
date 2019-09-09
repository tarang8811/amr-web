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
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import PropTypes from 'prop-types'
import { update, flatten } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import BookingActions from 'Redux/BookingRedux'
import PassengerActions from 'Redux/PassengerRedux'
import { SplitPassengerName, ConcatPassengerName } from 'Transforms/Passengers'

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
  }
}

const titles = [
  { displayName: 'Mr.', value: 'Mr.' },
  { displayName: 'Ms.', value: 'Ms.' }
]

class PnrList extends React.Component {
  constructor(props) {
    super()
    const { passengers } = props.location.state
    const splitPassengers = SplitPassengerName(passengers)
    this.state = {
      titles: splitPassengers.map(s => titles.find(t => t.value === s.title)),
      firstNames: splitPassengers.map(s => s.firstName),
      lastNames: splitPassengers.map(s => s.lastName),
      readyToSubmit: false
    }
  }

  onUpdate = (key, index) => value => {
    this.setState(
      { [key]: update(index, value, this.state[key]) },
      this.handleStateUpdate
    )
  }

  updatePassengers = () => {
    const { passengers } = this.props.location.state
    const updateParamsArray = []

    passengers.map((p, i) => {
      const passenger = ConcatPassengerName({
        title: this.state.titles[i].value,
        firstName: this.state.firstNames[i],
        lastName: this.state.lastNames[i]
      })

      if (passenger !== p.name) {
        updateParamsArray.push({ id: p.id, name: passenger })
      }
    })

    updateParamsArray.length && this.props.updatePassengers(updateParamsArray)
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

  render() {
    const { classes } = this.props
    return (
      <div>
        <GridContainer alignItems="center" justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>ALL PNR NAMES</h4>
              </CardHeader>
              <CardBody>
                {[...Array(this.state.titles.length).keys()].map(k => (
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
                        value={this.state.firstNames[k]}
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
                        value={this.state.lastNames[k]}
                      />
                    </GridItem>
                  </GridContainer>
                ))}
              </CardBody>
              <CardFooter>
                <GridItem xs={12} sm={12} md={3}>
                  <Button
                    disabled={!this.state.readyToSubmit}
                    color={this.state.readyToSubmit ? 'primary' : 'inactive'}
                    onClick={this.updatePassengers}
                    fullWidth
                  >
                    update
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

PnrList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createBooking: BookingActions.bookingCreateRequest,
      updatePassengers: PassengerActions.passengersUpdateRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PnrList)
