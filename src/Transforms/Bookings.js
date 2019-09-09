import { DateTime } from 'luxon'

export const FormatforUserBookings = data => {
  return data.map((d, i) => {
    return {
      id: d.id,
      slno: i + 1,
      Flight: d.flight.flightNumber,
      Sector: `${d.flight.origin} - ${d.flight.destination}`,
      'Booking Date': DateTime.fromISO(d.bookingDate).toFormat(
        'dd-LLL-yyyy hh:mm a'
      ),
      Departure: DateTime.fromISO(d.ticket.date).toFormat('dd-LLL-yyyy'),
      Passengers: d.passengers,
      PNR: d.ticket.pnr,
      Amount: `Rs. ${d.amount}`,
      Status: d.isCancelled ? 'Canceled' : 'Confirm',
      'Booked By': d.user.companyName
    }
  })
}

export const GetViewTicketData = data => {
  return {
    id: data.id,
    origin: data.flight.origin,
    date: data.ticket.date,
    destination: data.flight.destination,
    originCode: data.flight.originCode,
    destinationCode: data.flight.destinationCode,
    flightNumber: data.flight.flightNumber,
    arrivalTime: data.flight.arrivalTime,
    departureTime: data.flight.departureTime,
    passengers: data.passengers,
    refundable: data.ticket.refundable,
    pnr: data.ticket.pnr,
    amount: data.amount
  }
}
