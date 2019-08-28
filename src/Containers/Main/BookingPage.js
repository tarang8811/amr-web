import React from 'react'
import PropTypes from 'prop-types'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'Components/Grid/GridItem'
import GridContainer from 'Components/Grid/GridContainer'
import CustomInput from 'Components/CustomInput/CustomInput'
import Button from 'Components/CustomButtons/Button'
import Card from 'Components/Card/Card'
import CardHeader from 'Components/Card/CardHeader'
import CardBody from 'Components/Card/CardBody'
import CardFooter from 'Components/Card/CardFooter'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FlightActions from 'Redux/FlightRedux'
import AmrSelect from 'Components/Select'
import { FormatforAmrSelect } from 'Transforms/Flights'
import Picker from 'Components/Picker/Picker'
import TicketActions from 'Redux/TicketRedux'
import Paper from '@material-ui/core/Paper'
import Images from 'Themes/Images'
import Typography from '@material-ui/core/Typography'

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  userProfileGrid: {
    margin: '0 auto'
  },
  avatar: {
    width: '60px',
    height: '60px'
  }
}

class BookingPage extends React.Component {
  state = {
    showSearchResults: false
  }

  onUpdate = key => value => {
    this.setState({ [key]: value })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <GridContainer alignItems="center" justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardBody>
                <GridContainer direction="row">
                  <GridItem xs={12} sm={12} md={2}>
                    <img className={classes.avatar} src={Images.logo} alt="" />
                  </GridItem>
                  <GridContainer xs={12} sm={12} md={6} direction="row">
                    <GridContainer xs={12} sm={12} md={12}>
                      <Typography className={classes.sideBarHeading}>
                        DEL - IXB
                      </Typography>
                      <Typography component="p">SG-125</Typography>
                      <Typography component="p">Only 6 seats left</Typography>
                    </GridContainer>
                    <GridContainer xs={12} sm={12} md={12}>
                      <Typography className={classes.sideBarHeading}>
                        DEL - IXB
                      </Typography>
                      <Typography component="p">SG-125</Typography>
                      <Typography component="p">Only 6 seats left</Typography>
                    </GridContainer>
                  </GridContainer>
                  <GridContainer xs={12} sm={12} md={4} direction="row">
                    <GridContainer xs={12} sm={12} md={12}>
                      <Typography className={classes.sideBarHeading}>
                        DEL - IXB
                      </Typography>
                      <Typography component="p">SG-125</Typography>
                      <Typography component="p">Only 6 seats left</Typography>
                    </GridContainer>
                    <GridContainer xs={12} sm={12} md={12}>
                      <Typography className={classes.sideBarHeading}>
                        DEL - IXB
                      </Typography>
                      <Typography component="p">SG-125</Typography>
                      <Typography component="p">Only 6 seats left</Typography>
                    </GridContainer>
                  </GridContainer>
                </GridContainer>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add Ticket</h4>
                <p className={classes.cardCategoryWhite}>
                  Add tickets to your account
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Seats"
                      id="seats"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'number'
                      }}
                      onChange={this.onUpdate('totalSeats')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Seats"
                      id="seats"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'number'
                      }}
                      onChange={this.onUpdate('totalSeats')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Seats"
                      id="seats"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'number'
                      }}
                      onChange={this.onUpdate('totalSeats')}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.onAddTicket}>
                  Book
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

BookingPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BookingPage)
