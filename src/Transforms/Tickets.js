import { DateTime } from 'luxon'

export const FormatforAllTickets = data => {
  return data.map((d, i) => {
    return {
      id: d.id,
      slno: i + 1,
      Flight: d.flight.flightNumber,
      Sector: `${d.flight.origin} - ${d.flight.destination}`,
      Departure: d.date,
      seats: d.availableSeats,
      PNR: d.pnr,
      Price: d.price,
      'Entry Date': DateTime.fromISO(d.createdAt).toLocaleString(
        DateTime.DATETIME_MED
      )
    }
  })
}

export const AllTicketsHeader = [
  'Sl.No.',
  'Flight',
  'Sector',
  'Departure',
  'Avl. Seats',
  'PNR',
  'Price',
  'Entry Date'
]
