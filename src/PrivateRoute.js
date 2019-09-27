import { Route, Redirect } from 'react-router-dom'
import React from 'react'

export default ({ component: Component, authed, rest }) => {
  return authed ? (
    <Route {...rest} component={Component} />
  ) : (
    <Route
      {...rest}
      render={props => {
        const pathname =
          window.location.href.indexOf('register') !== -1
            ? '/register'
            : '/login'
        return <Redirect to={{ pathname: pathname }} />
      }}
    />
  )
}
