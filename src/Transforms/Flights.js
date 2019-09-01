import { DateTime } from 'luxon'

export const FormatforAmrSelect = data => {
  return data.map(d => {
    return {
      value: d.id,
      displayName: `(${d.origin} - ${d.destination}) ${d.flightNumber} [${d.departureTime} - ${d.arrivalTime}]`
    }
  })
}

export const FormatforAllFlights = data => {
  return data.map((d, i) => {
    return {
      id: d.id,
      slno: i + 1,
      Sector: d.fullSector,
      'Departure Time': DateTime.fromSQL(d.departureTime).toFormat('hh:mm a'),
      'Arrival Time': DateTime.fromSQL(d.arrivalTime).toFormat('hh:mm a'),
      'Flight Number': d.flightNumber,
      Active: d.isActive ? 'Active' : 'In Active'
    }
  })
}
