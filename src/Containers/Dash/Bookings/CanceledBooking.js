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
import styles from './ConfirmedBookingsStyles'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BookingActions from 'Redux/BookingRedux'
import { FormatforUserBookings } from 'Transforms/Bookings'
import { omit } from 'ramda'
import Button from 'Components/CustomButtons/Button'
import Picker from 'Components/Picker/Picker'
import store from 'store'

class ConfimedBookings extends Component {
  static propTypes = {
    classes: PropTypes.object,
    flights: PropTypes.array
  }

  state = { bookings: [], from: null, to: null }

  componentDidMount() {
    this.props.getBookings({
      isCancelled: 1,
      userId: store.get('userData').id
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bookings !== nextProps.bookings) {
      this.setState({ bookings: FormatforUserBookings(nextProps.bookings) })
    }
  }

  onTableChange = (action, tableState) => {}

  getTableOptions = () => {
    return {
      filterType: 'dropdown',
      serverSide: true,
      onTableChange: this.onTableChange
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
              <>
                {value.map(v => (
                  <p>{v.name}</p>
                ))}
              </>
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
      }
    ]
  }

  render() {
    const { classes } = this.props

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Cancelled Bookings</h4>
              <p className={classes.cardCategoryWhite}>List of bookings</p>
            </CardHeader>
            <CardBody>
              <Table
                tableTitle=""
                tableHeaderColor="primary"
                columns={this.getColumns()}
                data={this.state.bookings}
                options={this.getTableOptions()}
              />
            </CardBody>
          </Card>
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
)(ConfimedBookings)
