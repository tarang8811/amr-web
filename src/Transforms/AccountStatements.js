import { DateTime } from 'luxon'

export const FormatForAccountStatements = data => {
  return data.map((d, i) => {
    return {
      id: d.id,
      slno: i + 1,
      Flight: d.flight ? d.flight.flightNumber : '-',
      Sector: d.flight
        ? `${d.flight.originCode} - ${d.flight.destinationCode}`
        : '-',
      'Payment Date': DateTime.fromISO(d.paymentDate).toFormat(
        'dd-LLL-yyyy hh:mm a'
      ),
      'Debit Amount': d.mode === 'Debit' ? d.amount : '-',
      'Credit Amount': d.mode === 'Credit' ? d.amount : '-',
      Mode: d.mode,
      PNR: d.ticket ? d.ticket.pnr : '-',
      Balance: `Rs. ${d.currentBalance}`,
      Note: d.note
    }
  })
}
