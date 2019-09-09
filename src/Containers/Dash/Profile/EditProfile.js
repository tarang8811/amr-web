import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import InputLabel from '@material-ui/core/InputLabel'
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
import store from 'store'
import AuthActions from 'Redux/AuthRedux'

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

class EditProfile extends Component {
  state = {
    companyName: '',
    fullName: '',
    username: '',
    balance: 0,
    phone: '',
    altPhone: ''
  }

  componentDidMount() {
    const { balance, fullName, phone, companyName, username } = store.get(
      'userData'
    )
    this.setState({ balance, fullName, phone, companyName, username })
  }

  onUpdate = key => value => {
    this.setState({ [key]: value })
  }

  updateProfile = () => {
    const { companyName, fullName, phone, username } = this.state
    this.props.updateMe({
      companyName,
      fullName,
      phone,
      username
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <GridContainer alignItems="center" justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Company"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={this.state.companyName}
                      onChange={this.onUpdate('companyName')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={this.state.username}
                      onChange={this.onUpdate('username')}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={this.state.fullName}
                      onChange={this.onUpdate('fullName')}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Phone Number"
                      id="phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={this.state.phone}
                      onChange={this.onUpdate('phone')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Balance"
                      id="balance"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                      value={this.state.balance}
                      onChange={this.onUpdate('balance')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Alt Phone Number"
                      id="alt-phone-number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={this.state.altPhone}
                      onChange={this.onUpdate('altPhone')}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.updateProfile}>
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateMe: AuthActions.updateMeRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EditProfile)
