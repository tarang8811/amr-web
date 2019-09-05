import Drawer from '@material-ui/core/Drawer'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Hidden from '@material-ui/core/Hidden'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import sidebarStyle from './SideBarStyle'

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false
  }
  const { classes, color, logo, image, logoText, routes } = props
  var panels = routes.allRoutes.map((p, key) => (
    <ExpansionPanel className={classes.sideBarExpansionPanel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.sideBarExpansionSummary}
      >
        <Typography className={classes.sideBarHeading}>{p}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.sideBarExpansionDetails}>
        <List className={classes.list}>
          {routes.individualRoutes[p].map((prop, key) => {
            var activePro = ' '
            var listItemClasses
            listItemClasses = classNames({
              [' ' + classes[color]]: activeRoute(prop.layout + prop.path)
            })
            return (
              <NavLink
                to={prop.layout + prop.path}
                className={activePro + classes.item}
                key={key}
              >
                <ListItem
                  button
                  className={[classes.itemLink + classes.sideBarlistItem]}
                >
                  {typeof prop.icon === 'string' ? (
                    <Icon
                      className={classNames(classes.itemIcon, listItemClasses)}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(classes.itemIcon, listItemClasses, {
                        [classes.itemIconRTL]: props.rtlActive
                      })}
                    />
                  )}
                  <ListItemText
                    primary={props.rtlActive ? prop.rtlName : prop.name}
                    className={classNames(classes.itemText, listItemClasses, {
                      [classes.itemTextRTL]: props.rtlActive
                    })}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            )
          })}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ))
  var brand = (
    <div className={classes.logo}>
      <a
        href="/"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
      >
        {logoText}
      </a>
    </div>
  )
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? 'left' : 'right'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{panels}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{panels}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
}

export default withStyles(sidebarStyle)(Sidebar)
