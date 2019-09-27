import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'Components/Grid/GridItem'
import GridContainer from 'Components/Grid/GridContainer'
import CustomInput from 'Components/CustomInput/CustomInput'
import Button from 'Components/CustomButtons/Button'
import Card from 'Components/Card/Card'
import CardHeader from 'Components/Card/CardHeader'
import CardBody from 'Components/Card/CardBody'
import CardFooter from 'Components/Card/CardFooter'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RoleActions from 'Redux/RoleRedux'
import UserActions from 'Redux/UserRedux'
import AmrSelect from 'Components/Select'
import styles from 'Containers/Dash/Tickets/AddTicketStyles'
import { pathOr } from 'ramda'
import { FormatforRoles } from 'Transforms/Roles'
import Typography from '@material-ui/core/Typography'

class EditUser extends Component {
  static propTypes = {
    classes: PropTypes.object,
    roles: PropTypes.array
  }

  constructor(props) {
    super()
    const data = pathOr(null, ['data'], props.location.state)
    if (data) {
      const {
        id,
        companyName,
        fullName,
        phone,
        balance,
        username,
        role,
        isBlocked
      } = data
      this.state = {
        id: id,
        companyName,
        fullName,
        phone,
        balance,
        username,
        role: { value: role.id, displayName: role.name },
        roles: [],
        isBlocked
      }
    }
  }

  componentDidMount() {
    this.props.getRoles()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.roles !== nextProps.roles) {
      this.setState({ roles: FormatforRoles(nextProps.roles) })
    }

    if (
      this.props.userUpdateData !== nextProps.userUpdateData &&
      nextProps.userUpdateData &&
      nextProps.userUpdateData.id
    ) {
      this.props.history.push({ pathname: '/dash/all-users' })
    }
  }

  onSave = () => {
    if (this.state.id) {
      this.props.updateUser(this.state.id, {
        id: this.state.id,
        balance:
          this.state.balanceToAdd > 0
            ? this.state.balanceToAdd
            : -this.state.balanceToDeduct,
        role: { id: this.state.role.value },
        isBlocked: this.state.isBlocked
      })
    }
  }

  toggleIsBlocked = () => {
    this.setState({ isBlocked: !this.state.isBlocked }, this.onSave)
  }

  onUpdate = key => value => {
    this.setState({ [key]: value })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <GridContainer alignItems="center" justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Update User</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Typography className={classes.sideBarHeading}>
                      Company Name: {this.state.companyName}
                    </Typography>
                    <Typography className={classes.sideBarHeading}>
                      Full Name: {this.state.fullName}
                    </Typography>
                    <Typography className={classes.sideBarHeading}>
                      Phone: {this.state.phone}
                    </Typography>
                    <Typography className={classes.sideBarHeading}>
                      Balance: {this.state.balance}
                    </Typography>
                    <Typography className={classes.sideBarHeading}>
                      Username: {this.state.username}
                    </Typography>
                    <Typography className={classes.sideBarHeading}>
                      Status: {this.state.isBlocked ? 'In Active' : 'Active'}
                    </Typography>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Add Balance"
                      id="user-edit-balance-add"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'number'
                      }}
                      disabled={!!this.state.balanceToDeduct}
                      value={this.state.balanceToAdd}
                      onChange={this.onUpdate('balanceToAdd')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Deduct Balance"
                      id="user-edit-balance-deduct"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'number'
                      }}
                      disabled={!!this.state.balanceToAdd}
                      value={this.state.balanceToDeduct}
                      onChange={this.onUpdate('balanceToDeduct')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <AmrSelect
                      id="edit-user-role"
                      labelText="Role"
                      inputHtmlName="edit-user-role"
                      onChange={this.onUpdate('role')}
                      selectedObject={this.state.role}
                      data={this.state.roles}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.onSave}>
                  Update User
                </Button>
                {this.state.isBlocked ? (
                  <Button color="success" onClick={this.toggleIsBlocked}>
                    Activate
                  </Button>
                ) : (
                  <Button color="danger" onClick={this.toggleIsBlocked}>
                    De-Activate
                  </Button>
                )}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  roles: state.role.listData,
  userUpdateData: state.user.updateData
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRoles: RoleActions.rolesListRequest,
      updateUser: UserActions.usersUpdateRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EditUser)
