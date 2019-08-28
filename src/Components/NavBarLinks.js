import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Hidden from '@material-ui/core/Hidden'
import Poppers from '@material-ui/core/Popper'
import Divider from '@material-ui/core/Divider'
// @material-ui/icons
import Person from '@material-ui/icons/Person'
import Search from '@material-ui/icons/Search'
// core components
import CustomInput from 'Components/CustomInput/CustomInput'
import Button from 'Components/CustomButtons/Button'

import headerLinksStyle from './NavBarLinksStyles'

class AdminNavbarLinks extends React.Component {
  state = {
    openNotifcation: false,
    openProfile: false
  }
  handleToggleNotification = () => {
    this.setState(state => ({ openNotifcation: !state.openNotifcation }))
  }
  handleCloseNotification = event => {
    if (this.anchorNotification.contains(event.target)) {
      return
    }
    this.setState({ openNotifcation: false })
  }
  handleToggleProfile = () => {
    this.setState(state => ({ openProfile: !state.openProfile }))
  }
  handleCloseProfile = event => {
    if (this.anchorProfile.contains(event.target)) {
      return
    }
    this.setState({ openProfile: false })
  }
  render() {
    const { classes } = this.props
    const { openNotifcation, openProfile } = this.state
    return (
      <div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + ' ' + classes.search
            }}
            inputProps={{
              placeholder: 'Search',
              inputProps: {
                'aria-label': 'Search'
              }
            }}
          />
          <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>
        <div className={classes.manager}>
          <Button
            buttonRef={node => {
              this.anchorProfile = node
            }}
            color={window.innerWidth > 959 ? 'transparent' : 'white'}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openNotifcation ? 'profile-menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggleProfile}
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>Profile</p>
            </Hidden>
          </Button>
          <Poppers
            open={openProfile}
            anchorEl={this.anchorProfile}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !openProfile }) +
              ' ' +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleCloseProfile}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        Settings
                      </MenuItem>
                      <Divider light />
                      <MenuItem
                        onClick={this.handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    )
  }
}

AdminNavbarLinks.propTypes = {
  classes: PropTypes.object
}

export default withStyles(headerLinksStyle)(AdminNavbarLinks)
