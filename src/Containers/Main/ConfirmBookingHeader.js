// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Card from 'Components/Card/Card'
import CardBody from 'Components/Card/CardBody'
import GridContainer from 'Components/Grid/GridContainer'
// core components
import GridItem from 'Components/Grid/GridItem'
import { dangerColor, grayColor, successColor, whiteColor } from 'css/Helpers'
import { DateTime } from 'luxon'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import React from 'react'
import Images from 'Themes/Images'

const styles = {
  avatar: {
    width: '100px',
    height: '100px',
    marginLeft: '10px'
  },
  fullSectorHeading: {
    fontWeight: '600',
    marginRight: '10px'
  },
  flightNumber: {
    fontSize: '12px',
    backgroundColor: dangerColor[3],
    color: whiteColor,
    padding: '4px 10px',
    height: '24px',
    marginRight: '10px'
  },
  seats: {
    fontWeight: '600',
    fontSize: '14px',
    marginRight: '10px',
    color: dangerColor[3]
  },
  departureNArrival: {
    fontWeight: '600',
    color: dangerColor[3],
    fontSize: '14px',
    marginRight: '10px'
  },
  time: {
    fontWeight: '500',
    fontSize: '14px',
    marginRight: '20px'
  },
  priceHeader: {
    fontSize: '12px',
    color: grayColor[0],
    marginRight: '6px'
  },
  price: {
    fontSize: '16px',
    color: successColor[0],
    marginRight: '2px'
  },
  refundable: {
    fontSize: '12px',
    color: successColor[0]
  },
  nonRedunable: {
    fontSize: '12px',
    color: dangerColor[0]
  }
}

const ConfirmBookingHeader = ({ classes, data }) => (
  <Card>
    <CardBody>
      <GridContainer direction="row">
        <GridItem xs={12} sm={12} md={2}>
          <img className={classes.avatar} src={Images.spicejet} alt="" />
        </GridItem>
        <GridItem
          container
          xs={12}
          sm={12}
          md={7}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <GridItem container xs={12} sm={12} md={12}>
            <Typography className={classes.fullSectorHeading}>
              {data.flight.fullSector}
            </Typography>
            <Typography className={classes.flightNumber}>
              {data.flight.flightNumber}
            </Typography>
          </GridItem>
          <GridItem
            container
            xs={12}
            sm={12}
            md={12}
            alignItems="center"
            justify="flex=start"
          >
            <Typography className={classes.seats}>Seats:</Typography>
            <Typography className={classes.time}>{data.seats}</Typography>
          </GridItem>
          <GridItem
            container
            xs={12}
            sm={12}
            md={12}
            alignItems="center"
            justify="flex=start"
          >
            <Typography className={classes.departureNArrival}>
              Departure:
            </Typography>
            <Typography className={classes.time}>
              {DateTime.fromSQL(data.flight.departureTime).toFormat('hh:mm a')}
            </Typography>
            <Typography className={classes.departureNArrival}>
              Arrival
            </Typography>
            <Typography className={classes.time}>
              {DateTime.fromSQL(data.flight.arrivalTime).toFormat('hh:mm a')}
            </Typography>
          </GridItem>
        </GridItem>
        <GridItem
          container
          xs={12}
          sm={12}
          md={3}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <GridItem
            container
            xs={12}
            sm={12}
            md={12}
            justify="flex-end"
            alignItems="center"
          >
            <Typography className={classes.priceHeader}>
              TOTAL PRICE:
            </Typography>
            <Typography className={classes.price}>
              Rs. {data.price * data.seats}
            </Typography>
          </GridItem>
          <GridItem
            container
            xs={12}
            sm={12}
            md={12}
            justify="flex-end"
            alignItems="flex-start"
          >
            {data.refundable ? (
              <Typography className={classes.refundable}>REFUNDABLE</Typography>
            ) : (
              <Typography className={classes.nonRedunable}>
                NON REFUNDABLE
              </Typography>
            )}
          </GridItem>
        </GridItem>
      </GridContainer>
    </CardBody>
  </Card>
)

export default withStyles(styles)(ConfirmBookingHeader)
