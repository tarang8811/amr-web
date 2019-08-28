import { Route, Redirect } from 'react-router-dom'
import React from 'react'

export default ({ component: Component, authed, rest }) => {
  return authed ? (
    <Route {...rest} component={Component} />
  ) : (
    <Route
      {...rest}
      render={props => <Redirect to={{ pathname: '/login' }} />}
    />
  )
}
