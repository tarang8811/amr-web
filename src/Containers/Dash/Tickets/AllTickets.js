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
import styles from './AllTicketsStyles'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TicketActions from 'Redux/TicketRedux'
import { FormatforAllTickets, AllTicketsHeader } from 'Transforms/Tickets'
import { omit } from 'ramda'
import Button from 'Components/CustomButtons/Button'

class AllTickets extends Component {
  static propTypes = {
    classes: PropTypes.object,
    flights: PropTypes.array
  }

  state = { tickets: [] }

  componentDidMount() {
    this.props.getTickets()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tickets !== nextProps.tickets) {
      this.setState({ tickets: FormatforAllTickets(nextProps.tickets) })
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
        name: 'Departure',
        options: {
          filter: false,
          sort: false,
          empty: true
        }
      },
      {
        label: 'Avl. Seats',
        name: 'seats',
        options: {
          filter: true,
          sort: false,
          empty: true
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
        name: 'Price',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Entry Date',
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
                <Button size="sm" color="primary" onClick={this.onEditTicket}>
                  Edit
                </Button>
                <Button size="sm" color="primary" onClick={this.onPnrListClick}>
                  PNR LIST
                </Button>
              </>
            )
          }
        }
      }
    ]
  }

  onEditTicket = () => {}

  onPnrListClick = () => {}

  render() {
    const { classes } = this.props

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Tickets</h4>
              <p className={classes.cardCategoryWhite}>
                A list of all your tickets in the platform
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableTitle=""
                tableHeaderColor="primary"
                columns={this.getColumns()}
                data={this.state.tickets}
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
)(AllTickets)
