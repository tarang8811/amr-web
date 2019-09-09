import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'Components/Grid/GridItem'
import GridContainer from 'Components/Grid/GridContainer'
import Table from 'Components/Table/Table'
import Card from 'Components/Card/Card'
import CardHeader from 'Components/Card/CardHeader'
import CardBody from 'Components/Card/CardBody'
import styles from './UserBookedTicketsStyles'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BookingActions from 'Redux/BookingRedux'
import { FormatforUserBookings, GetViewTicketData } from 'Transforms/Bookings'
import Button from 'Components/CustomButtons/Button'
import Picker from 'Components/Picker/Picker'

class UserBookedTickets extends Component {
  static propTypes = {
    classes: PropTypes.object,
    flights: PropTypes.array
  }

  state = { bookings: [], from: null, to: null, readyToSubmit: false }

  componentWillReceiveProps(nextProps) {
    if (this.props.bookings !== nextProps.bookings) {
      this.setState({ bookings: FormatforUserBookings(nextProps.bookings) })
    }
  }

  onTableChange = (action, tableState) => {}

  getTableOptions = () => {
    return {
      filterType: 'dropdown',
      onTableChange: this.onTableChange,
      selectableRows: 'none',
      filter: false,
      print: false,
      download: false
    }
  }

  getColumns = () => {
    return [
      {
        label: 'Sl. No.',
        name: 'slno',
        options: {
          filter: false,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Flight',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Sector',
        options: {
          filter: false,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Booking Date',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Departure',
        options: {
          filter: false,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Passengers',
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <GridItem container alignItems="center">
                {value.map(v => (
                  <span>{v.name}</span>
                ))}
              </GridItem>
            )
          }
        }
      },
      {
        name: 'PNR',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Amount',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Status',
        options: {
          filter: false,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Booked By',
        options: {
          filter: false,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Action',
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <Button
                  size="sm"
                  color="primary"
                  onClick={this.onViewTicket(tableMeta.rowIndex)}
                >
                  View Ticket
                </Button>
              </>
            )
          }
        }
      }
    ]
  }

  onUpdate = key => value => {
    this.setState({ [key]: value }, this.handleStateUpdate)
  }

  handleStateUpdate = () => {
    const readyToSubmit = !!this.state.from && !!this.state.to
    this.setState({ readyToSubmit })
  }

  searchBooking = () => {
    this.props.getBookings({
      bookingDate: { $gte: this.state.from, $lte: `${this.state.to} 23:59:59` },
      userBookedTickets: true
    })
  }

  onViewTicket = rowIndex => () => {
    const bookingData = this.props.bookings[rowIndex]
    this.props.history.push({
      pathname: '/dash/view-ticket',
      state: { data: GetViewTicketData(bookingData) }
    })
  }

  render() {
    const { classes } = this.props

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>All Portal Bookings</h4>
              <p className={classes.cardCategoryWhite}>List of bookings</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <Picker
                    id="user-booking-from"
                    labelText="Booking Date (From)"
                    value={this.state.from}
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.onUpdate('from')}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <Picker
                    id="user-booking-to"
                    labelText="Booking Date (To)"
                    value={this.state.to}
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.onUpdate('to')}
                  />
                </GridItem>
                <GridItem
                  container
                  alignItems="center"
                  justify="center"
                  xs={12}
                  sm={12}
                  md={2}
                >
                  <Button
                    disabled={!this.state.readyToSubmit}
                    color={this.state.readyToSubmit ? 'primary' : 'inactive'}
                    onClick={this.searchBooking}
                    fullWidth
                  >
                    Search
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          {!!this.state.bookings.length && (
            <Card className={classes.tableCard}>
              <Table
                tableTitle=""
                tableHeaderColor="primary"
                columns={this.getColumns()}
                data={this.state.bookings}
                options={this.getTableOptions()}
              />
            </Card>
          )}
        </GridItem>
      </GridContainer>
    )
  }
}

const mapStateToProps = state => ({
  bookings: state.booking.listData
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBookings: BookingActions.bookingListRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserBookedTickets)
