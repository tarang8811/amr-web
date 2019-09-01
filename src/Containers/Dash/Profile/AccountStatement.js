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

class AccountStatements extends Component {
  static propTypes = {
    classes: PropTypes.object,
    accountStatements: PropTypes.array
  }

  state = { accountStatements: [] }

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
              <Table
                tableTitle=""
                tableHeaderColor="primary"
                columns={this.getColumns()}
                data={this.state.accountStatements}
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
