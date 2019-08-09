import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import LoginScreen from 'Containers/LoginScreen'
import SignUpScreen from 'Containers/SignUpScreen'
import { Route } from 'react-router-dom'
import DashBoardScreen from 'Containers/Dash'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={SignUpScreen} />
        <Route path="/dash" component={DashBoardScreen} />
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
