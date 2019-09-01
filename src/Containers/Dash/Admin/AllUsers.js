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
import UserActions from 'Redux/UserRedux'
import { FormatforAllUsers } from 'Transforms/Users'
import Button from 'Components/CustomButtons/Button'

class AllUsers extends Component {
  static propTypes = {
    classes: PropTypes.object,
    users: PropTypes.array
  }

  state = { users: [] }

  componentDidMount() {
    this.props.getUsers()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.users !== nextProps.users) {
      this.setState({ users: FormatforAllUsers(nextProps.users) })
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
        name: 'Company',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Username',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Name',
        options: {
          filter: true,
          sort: false,
          empty: true
        }
      },
      {
        name: 'Phone Number',
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
        name: 'Alt. Phone Number',
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
                  onClick={this.onEditUser(tableMeta.rowIndex)}
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

  onEditUser = rowIndex => () => {
    const userData = this.props.users[rowIndex]
    this.props.history.push({
      pathname: '/dash/edit-user',
      state: {
        data: userData
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
              <h4 className={classes.cardTitleWhite}>Users</h4>
              <p className={classes.cardCategoryWhite}>
                A list of all your users in the platform
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableTitle=""
                tableHeaderColor="primary"
                columns={this.getColumns()}
                data={this.state.users}
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
  users: state.user.listData
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUsers: UserActions.usersListRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AllUsers)
