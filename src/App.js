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
import Loader from 'react-loader-spinner'

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
        {this.props.showLoader && (
          <div className="Loader">
            <Loader type="Plane" color="#00BFFF" secondaryColor="#af2cc5" />
          </div>
        )}
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
  auth: state.auth,
  showLoader: state.ui.showLoader
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
