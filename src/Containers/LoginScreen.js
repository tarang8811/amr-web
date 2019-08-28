import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
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
import TextField from 'Components/AmrTextField'
import PasswordTextField from 'Components/PasswordTextField'
import { bindActionCreators } from 'redux'
import AuthActions from 'Redux/AuthRedux'
import store from 'store'
import { pathOr } from 'ramda'

class LoginScreen extends Component {
  state = { username: '', password: '' }

  onChangePassword = e => {
    this.setState({ password: e.target.value })
  }

  onChangeUsername = e => {
    this.setState({ username: e.target.value })
  }

  onLogin = () => {
    this.props.loginRequest(this.state)
  }

  componentDidUpdate() {
    store.set('tokenData', this.props.auth)
    const accessToken = pathOr(null, ['accessToken'], this.props.auth)
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      this.props.history.push('/dash')
    }
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
              Sign in
            </Typography>
            <div className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <PasswordTextField
                    onChange={this.onChangePassword}
                    value={this.state.password}
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.onLogin}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </div>
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
      loginRequest: AuthActions.loginRequest
    },
    dispatch
  )

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginScreen)
