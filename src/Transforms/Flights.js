export const FormatforAmrSelect = data => {
  return data.map(d => {
    return {
      value: d.id,
      displayName: `(${d.origin} - ${d.destination}) ${d.flightNumber} [${d.departureTime} - ${d.arrivalTime}]`
    }
  })
}
