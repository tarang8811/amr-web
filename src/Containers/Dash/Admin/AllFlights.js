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
import styles from 'Containers/Dash/Tickets/AllTicketsStyles'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FlightActions from 'Redux/FlightRedux'
import { FormatforAllFlights } from 'Transforms/Flights'
import Button from 'Components/CustomButtons/Button'

class AllFlights extends Component {
  static propTypes = {
    classes: PropTypes.object,
    flights: PropTypes.array
  }

  state = { flights: [] }

  componentDidMount() {
    this.props.getFlights()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.flights !== nextProps.flights) {
      this.setState({ flights: FormatforAllFlights(nextProps.flights) })
    }
  }

  onTableChange = (action, tableState) => {}

  getTableOptions = () => {
    return {
      onTableChange: this.onTableChange,
      selectableRows: 'none',
      filter: false,
      print: false,
      download: false,
      sort: true,
      sortDirection: 'desc'
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
        name: 'Sector',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Departure Time',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Arrival Time',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Flight Number',
        options: {
          filter: false,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Active',
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
                  onClick={this.onEditFlight(tableMeta.rowIndex)}
                >
                  Edit
                </Button>
              </>
            )
          }
        }
      }
    ]
  }

  onEditFlight = rowIndex => () => {
    const flightData = this.props.flights[rowIndex]
    this.props.history.push({
      pathname: '/dash/edit-flight',
      state: {
        data: flightData
      }
    })
  }

  render() {
    const { classes } = this.props

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Flight</h4>
              <p className={classes.cardCategoryWhite}>
                A list of all your flights in the platform
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableTitle=""
                tableHeaderColor="primary"
                columns={this.getColumns()}
                data={this.state.flights}
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
  flights: state.flight.listData
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFlights: FlightActions.flightsListRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AllFlights)
