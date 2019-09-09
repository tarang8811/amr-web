import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import LoginScreen from 'Containers/LoginScreen'
import SignUpScreen from 'Containers/SignUpScreen'
import { Route, Redirect } from 'react-router-dom'
import DashBoardScreen from 'Containers/Dash'
import PrivateRoute from './PrivateRoute'
import StartupActions from 'Redux/StartupRedux'
import UIActions from 'Redux/UIRedux'
import { bindActionCreators } from 'redux'
import store from 'store'
import MainScreen from 'Containers/Main'
import Loader from 'react-loader-spinner'
import Notification from 'Components/Notification/Notification'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Cancel from '@material-ui/icons/Cancel'
import { NOTIFICATION_TYPES } from 'Themes/constants'

const NotificationTypeToIconMap = {
  [NOTIFICATION_TYPES.success]: CheckCircle,
  [NOTIFICATION_TYPES.error]: Cancel
}

class App extends Component {
  componentWillMount() {
    this.props.startup()
  }

  closeSuccessNoticiation = () => {
    this.props.onToggleNotification('', this.props.notificationType)
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
        <Notification
          place="tc"
          color={this.props.notificationType}
          message={this.props.successMessage}
          icon={NotificationTypeToIconMap[this.props.notificationType]}
          open={!!this.props.successMessage}
          closeNotification={this.closeSuccessNoticiation}
          close
        />
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
  showLoader: state.ui.showLoader,
  successMessage: state.ui.successMessage,
  notificationType: state.ui.notificationType
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startup: StartupActions.startup,
      onToggleNotification: UIActions.onToggleNotification
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
