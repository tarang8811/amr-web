import React, { Component } from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'Components/Grid/GridItem'
import GridContainer from 'Components/Grid/GridContainer'
import Card from 'Components/Card/Card'
import CardHeader from 'Components/Card/CardHeader'
import CardBody from 'Components/Card/CardBody'
import styles from './ViewTicketStyles'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TicketActions from 'Redux/TicketRedux'
import Button from 'Components/CustomButtons/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CustomInput from 'Components/CustomInput/CustomInput'
import Divider from '@material-ui/core/Divider'
import { pathOr } from 'ramda'
import Typography from '@material-ui/core/Typography'
import { DateTime } from 'luxon'
import { Grid } from '@material-ui/core'
import ReactToPrint from 'react-to-print'

class PreviewTicket extends Component {
  render() {
    const { classes, data } = this.props
    return (
      <Card
        className={classes.ticketCard}
        ref={ref => (this.componentRef = ref)}
      >
        <CardBody className={classes.ticketCardBody}>
          <GridItem container justify="space-between" alignItems="center">
            <Typography
              className={classes.ticketHeader}
              component="h1"
              variant="h5"
            >
              Ticket
            </Typography>
            <Typography className={classes.pnr} component="h1" variant="h5">
              PNR - {data.pnr}
            </Typography>
          </GridItem>
          <Divider className={classes.headerDivider} />
          <GridItem
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Typography component="h2" className={classes.sector}>
              {data.origin} to {data.destination}
              <span className={classes.date}>
                {DateTime.fromISO(data.date).toFormat('EEE, dd LLL yyyy')}
              </span>
            </Typography>
            <Typography className={classes.bookingId}>
              Booking ID: {data.id}
            </Typography>
          </GridItem>
          <Divider />
          <GridItem>
            <Typography className={classes.flightNumber}>
              Flight Number: {data.flightNumber}
            </Typography>
            <GridItem container direction="row" justify="center">
              <Grid className={classes.flightInfo}>
                <Typography className={classes.sectorCode}>
                  {data.originCode}
                </Typography>
                <Typography className={classes.timeCode}>
                  {DateTime.fromSQL(data.departureTime).toFormat('hh:mm a')}
                </Typography>
              </Grid>
              <Grid className={classes.flightInfo}>
                <Typography className={classes.sectorCode}>
                  {data.destinationCode}
                </Typography>
                <Typography className={classes.timeCode}>
                  {DateTime.fromSQL(data.arrivalTime).toFormat('hh:mm a')}
                </Typography>
              </Grid>
            </GridItem>
          </GridItem>
          <Divider />
          <GridItem container alignItems="center">
            <Typography className={classes.travellers}>Travellers</Typography>
          </GridItem>
          <Divider />
          <GridItem>
            {data.passengers.map((p, i) => (
              <Typography className={classes.passengername}>{`${i + 1}. ${
                p.name
              }`}</Typography>
            ))}
          </GridItem>
          <Divider />
          <GridItem container direction="row" alignItems="center">
            <span className={classes.important}>IMPORTANT :</span>
            <Typography className={classes.importantNote}>
              {data.importantNote}
            </Typography>
          </GridItem>
          <Divider />
          <GridItem>
            <div className={classes.additionalInfo}>Terms and conditions :</div>
            <ul>
              <li>
                Carriage and other services provided by the carrier are subject
                to conditions of carriage and may be obtained from the issuing
                carrier
              </li>
              <li>
                Changes/Cancellations to booking will be as per the procedures
                advised by the concerned Airline/s / Vendor/s from time to time.
              </li>
              <li>
                If you have booked tickets with your credit card, please carry a
                photocopy (both front and back by striking off the CVV portion)
                of your credit card while travelling or a valid authorization
                letter in case a third party credit card is used Adherence to
                the check-in reporting time, ideally two hours prior departure,
                & carrying a valid identification proof will be in your best
                interest.
              </li>
              <li>
                If departure within 24hours it is suggested to cancel the
                itinerary with the respective airlines - G8 9223222111 or
                020-25662111 / SG 9654003333 or 9871803333 / 6E 9910383838 or
                1246613838 / 9W 1800225522 or 011-39893333 / AI 1800227722 or
                0124-2877777 / UK 18601089999 / IC 18001801407 / LB 180042500666
                or 09908600400 / I5 18605008000
              </li>
              <li>
                Do not hesitate to contact your ticketing Agent for further
                clarifications, if any.
              </li>
            </ul>
          </GridItem>
        </CardBody>
      </Card>
    )
  }
}

export default PreviewTicket
