import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from 'Components/AmrTextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import styles from './LoginScreenStyles'
import Images from 'Themes/Images'
import Bounce from 'react-reveal/Bounce'
import MadeWithLove from 'Components/MadeWithLove'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import PasswordTextField from 'Components/PasswordTextField'
import { bindActionCreators } from 'redux'
import AuthActions from 'Redux/AuthRedux'
import store from 'store'
import { pathOr } from 'ramda'

class SignUpScreen extends Component {
  state = {
    firstName: '',
    lastName: '',
    companyName: '',
    username: '',
    password: '',
    phone: '',
    readyToSubmit: false
  }

  onUpdate = key => e => {
    this.setState({ [key]: e.target.value }, this.handleStateUpdate)
  }

  componentDidUpdate() {
    store.set('tokenData', this.props.auth)
    const accessToken = pathOr(null, ['accessToken'], this.props.auth)
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      this.props.history.push('/')
    }
  }

  onSignUp = () => {
    const {
      firstName,
      lastName,
      companyName,
      username,
      password,
      phone
    } = this.state
    this.props.signupRequest({
      username,
      companyName,
      username,
      password,
      phone,
      fullName: `${firstName} ${lastName}`
    })
  }

  handleStateUpdate = () => {
    const readyToSubmit =
      !!this.state.firstName &&
      !!this.state.lastName &&
      !!this.state.companyName &&
      !!this.state.username &&
      !!this.state.password &&
      this.state.phone.length > 9
    this.setState({ readyToSubmit })
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Bounce top>
              <img className={classes.avatar} src={Images.logo} alt="" />
            </Bounce>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={this.state.firstName}
                  onChange={this.onUpdate('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={this.state.lastName}
                  onChange={this.onUpdate('lastName')}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="companyName"
                  label="Company Name"
                  name="companyName"
                  autoComplete="lname"
                  value={this.state.companyName}
                  onChange={this.onUpdate('companyName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  label="Username"
                  name="email"
                  autoComplete="email"
                  value={this.state.username}
                  onChange={this.onUpdate('username')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  value={this.state.phone}
                  onChange={this.onUpdate('phone')}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordTextField
                  onChange={this.onUpdate('password')}
                  value={this.state.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!this.state.readyToSubmit}
              color={this.state.readyToSubmit ? 'primary' : 'inactive'}
              className={classes.submit}
              onClick={this.onSignUp}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </div>
          <Box mt={5}>
            <MadeWithLove />
          </Box>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth.data
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signupRequest: AuthActions.signupRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignUpScreen)
