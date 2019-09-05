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
import AccountStatmentActions from 'Redux/AccountStatementRedux'
import { FormatForAccountStatements } from 'Transforms/AccountStatements'
import store from 'store'
import Button from 'Components/CustomButtons/Button'
import Picker from 'Components/Picker/Picker'

class AccountStatements extends Component {
  static propTypes = {
    classes: PropTypes.object,
    accountStatements: PropTypes.array
  }

  state = { accountStatements: [], from: null, to: null, readyToSubmit: false }

  componentDidMount() {
    this.props.getAccountStatements({
      userId: store.get('userData').id
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.accountStatements !== nextProps.accountStatements) {
      this.setState({
        accountStatements: FormatForAccountStatements(
          nextProps.accountStatements
        )
      })
    }
  }

  onUpdate = key => value => {
    this.setState({ [key]: value }, this.handleStateUpdate)
  }

  searchStatements = () => {
    this.props.getAccountStatements({
      paymentDate: { $gte: this.state.from, $lte: `${this.state.to} 23:59:59` },
      userId: store.get('userData').id
    })
  }

  handleStateUpdate = () => {
    const readyToSubmit = !!this.state.from && !!this.state.to
    this.setState({ readyToSubmit })
  }

  onTableChange = (action, tableState) => {}

  getTableOptions = () => {
    return {
      filterType: 'dropdown',
      filter: false,
      onTableChange: this.onTableChange,
      selectableRows: 'none'
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
        name: 'Payment Date',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Mode',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Debit Amount',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Credit Amount',
        options: {
          filter: false,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Balance',
        options: {
          filter: false,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Flight',
        options: {
          filter: false,
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
        name: 'PNR',
        options: {
          filter: false,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Note',
        options: {
          filter: false,
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
              <h4 className={classes.cardTitleWhite}>My Account Statements</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <Picker
                    id="payment-date-from"
                    labelText="Payment Date (From)"
                    value={this.state.from}
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.onUpdate('from')}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <Picker
                    id="payment-date-to"
                    labelText="Payment Date (To)"
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
                    onClick={this.searchStatements}
                    fullWidth
                  >
                    Search
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <Card className={classes.tableCard}>
            <Table
              tableTitle=""
              tableHeaderColor="primary"
              columns={this.getColumns()}
              data={this.state.accountStatements}
              options={this.getTableOptions()}
            />
          </Card>
        </GridItem>
      </GridContainer>
    )
  }
}

const mapStateToProps = state => ({
  accountStatements: state.accountStatment.listData
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAccountStatements: AccountStatmentActions.accountStatementsListRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AccountStatements)
