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
import Navbar from 'Components/NavBar'
import Footer from 'Components/Footer'
import dashboardStyle from './indexStyles'
import Images from 'Themes/Images'

let ps

const switchRoutes = (
  <Switch>
    {routes.individualRoutesArray.map((prop, key) => {
      if (prop.layout === '/dash') {
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
    <Redirect from="/dash" to="/dash/dashboard" />
  </Switch>
)

class Dashboard extends React.Component {
  state = {
    image: Images[`sideBar${Math.floor(Math.random() * 4) + 1}`],
    color: 'blue',
    hasImage: true,
    fixedClasses: 'dropdown show',
    mobileOpen: false
  }
  mainPanel = React.createRef()
  handleImageClick = image => {
    this.setState({ image: image })
  }
  handleColorClick = color => {
    this.setState({ color: color })
  }
  handleFixedClick = () => {
    if (this.state.fixedClasses === 'dropdown') {
      this.setState({ fixedClasses: 'dropdown show' })
    } else {
      this.setState({ fixedClasses: 'dropdown' })
    }
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false })
    }
  }
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
        <Sidebar
          routes={routes}
          logoText={'Amr Travels'}
          logo={Images.logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <Navbar
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

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(dashboardStyle)(Dashboard)
