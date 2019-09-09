// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import TicketBookingResult from 'Components/Booking/TicketBookingResult'
import Card from 'Components/Card/Card'
import CardBody from 'Components/Card/CardBody'
import CardHeader from 'Components/Card/CardHeader'
import Button from 'Components/CustomButtons/Button'
import CustomInput from 'Components/CustomInput/CustomInput'
import GridContainer from 'Components/Grid/GridContainer'
// core components
import GridItem from 'Components/Grid/GridItem'
import Picker from 'Components/Picker/Picker'
import AmrSelect from 'Components/Select'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import SectorActions from 'Redux/SectorRedux'
import TicketActions from 'Redux/TicketRedux'
import Typography from '@material-ui/core/Typography'

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
  }
}

class BookingSelect extends React.Component {
  componentDidMount() {
    this.props.getSectors()
  }

  state = {
    showSearchResults: false,
    sector: null,
    date: null,
    seats: 0,
    readyToSubmit: false,
    showNoData: false
  }

  searchedOnce = false

  componentWillReceiveProps(nextProps) {
    if (!nextProps.ticketTotal && this.searchedOnce && !this.state.showNoData) {
      this.setState({ showNoData: true })
    } else if (this.state.showNoData && !!nextProps.ticketTotal) {
      this.setState({ showNoData: false })
    }
  }

  onUpdate = key => value => {
    this.setState({ [key]: value }, this.handleStateUpdate)
  }

  searchFlight = () => {
    const sectorArray = this.state.sector.value.split('-')
    this.searchedOnce = true
    this.props.getTickets({
      originCode: sectorArray[0],
      destinationCode: sectorArray[1],
      date: this.state.date,
      availableSeats: { $gte: this.state.seats }
    })
  }

  handleStateUpdate = () => {
    const readyToSubmit =
      !!this.state.sector && !!this.state.date && !!this.state.seats
    this.setState({ readyToSubmit })
  }

  onBookTicket = data => () => {
    this.props.history.push({
      pathname: '/confirm-booking',
      state: {
        data: {
          ...data,
          seats: this.state.seats,
          date: this.state.date
        }
      }
    })
  }

  render() {
    const { classes } = this.props

    const sectors = this.props.sectors.map(s => {
      return {
        displayName: s.fullSector,
        value: `${s.originCode}-${s.destinationCode}`
      }
    })

    return (
      <div>
        <GridContainer alignItems="center" justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Domestic Flights</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <AmrSelect
                      id="booking-sector"
                      labelText="Sector"
                      inputHtmlName="booking-sector"
                      onChange={this.onUpdate('sector')}
                      selectedObject={this.state.sector}
                      data={sectors}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Picker
                      id="add-ticket-picker"
                      labelText="Booking Date"
                      value={this.state.date}
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={this.onUpdate('date')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      labelText="Seats"
                      id="seats"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'number'
                      }}
                      onChange={this.onUpdate('seats')}
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={2}
                    alignItems="center"
                    justify="center"
                    container
                  >
                    <Button
                      fullWidth
                      disabled={!this.state.readyToSubmit}
                      color={this.state.readyToSubmit ? 'primary' : 'inactive'}
                      onClick={this.searchFlight}
                    >
                      Search Flights
                    </Button>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>

            {this.state.showNoData ? (
              <Typography className={classes.time}>
                No tickets available for the following date. Please try a
                different date
              </Typography>
            ) : (
              this.props.tickets.map(t => (
                <TicketBookingResult
                  data={t}
                  onBookTicket={this.onBookTicket(t)}
                />
              ))
            )}
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

BookingSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  sectors: state.sector.listData,
  tickets: state.ticket.listData,
  ticketTotal: state.ticket.listDataTotal
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSectors: SectorActions.sectorsListRequest,
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
)(BookingSelect)
