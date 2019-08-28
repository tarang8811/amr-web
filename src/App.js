import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import LoginScreen from 'Containers/LoginScreen'
import SignUpScreen from 'Containers/SignUpScreen'
import { Route, Redirect } from 'react-router-dom'
import DashBoardScreen from 'Containers/Dash'
import PrivateRoute from './PrivateRoute'
import StartupActions from 'Redux/StartupRedux'
import { bindActionCreators } from 'redux'
import store from 'store'
import MainScreen from 'Containers/Main'

class App extends Component {
  componentWillMount() {
    this.props.startup()
  }

  render() {
    const tokenData = store.get('tokenData')
    const component =
      window.location.href.indexOf('dash') !== -1 ? DashBoardScreen : MainScreen
    return (
      <div className="App">
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={SignUpScreen} />
        <PrivateRoute
          authed={!!tokenData && !!tokenData.accessToken}
          component={component}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startup: StartupActions.startup
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
