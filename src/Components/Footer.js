/*eslint-disable*/
import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
// core components
import footerStyle from './FooterStyles.js'

function Footer({ ...props }) {
  const { classes } = props
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#support" className={classes.block}>
                Support: 9832302122
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{' '}
            <a
              href="https://amrtravels.in"
              target="_blank"
              className={classes.a}
            >
              Amr Travels
            </a>
            , made with love for a better travel booking
          </span>
        </p>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(footerStyle)(Footer)
