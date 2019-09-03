import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Sidebar from 'Components/SideBar'

import routes from 'routes'
import MainNavBar from 'Components/Main/MainNavBar'
import Footer from 'Components/Footer'
import dashboardStyle from './indexStyles'
import Images from 'Themes/Images'

let ps

const switchRoutes = (
  <Switch>
    {routes.individualRoutesArray.map((prop, key) => {
      if (prop.layout === '/') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      }
      return null
    })}
  </Switch>
)

class Main extends React.Component {
  state = {
    image: Images[`sideBar${Math.floor(Math.random() * 4) + 1}`],
    color: 'blue',
    hasImage: true,
    fixedClasses: 'dropdown show',
    mobileOpen: false
  }
  mainPanel = React.createRef()
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current)
    }
    window.addEventListener('resize', this.resizeFunction)
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanel.current.scrollTop = 0
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false })
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy()
    }
    window.removeEventListener('resize', this.resizeFunction)
  }
  render() {
    const { classes, ...rest } = this.props
    return (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <MainNavBar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(dashboardStyle)(Main)
