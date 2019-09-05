const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
    }
  },
  editButton: {
    padding: '6px 12px !important'
  },
  tableCard: {
    paddingLeft: '24px',
    paddingRight: '24px'
  },
  group: {
    flexWrap: 'inherit',
    flexDirection: 'row'
  },
  customInput: {
    marginTop: '0px'
  },
  ticketHeader: {
    margin: '8px 0px',
    fontWeight: '600'
  },
  headerDivider: {
    height: '2px',
    backgroundColor: '#00000099'
  },
  sector: {
    margin: '8px 0px',
    fontWeight: '600',
    fontSize: '18px'
  },
  date: {
    fontSize: '12px',
    marginLeft: '10px',
    fontWeight: '500'
  },
  bookingId: {
    fontSize: '14px'
  },
  ticketCard: {
    padding: '20px 40px'
  },
  flightNumber: {
    margin: '8px 0px',
    fontWeight: '600',
    fontSize: '16px'
  },
  sectorCode: {
    fontSize: '20px',
    fontWeight: '500'
  },
  timeCode: {
    fontSize: '18px',
    fontWeight: '600'
  },
  flightInfo: {
    margin: '30px 40px'
  },
  pnr: {
    fontWeight: '600',
    fontSize: '20px'
  },
  travellers: {
    fontWeight: '600',
    fontSize: '12px',
    margin: '5px 0px'
  },
  passengername: {
    fontWeight: '600',
    fontSize: '14px',
    margin: '10px 0px'
  },
  important: {
    fontSize: '12px',
    margin: '10px 0px'
  },
  importantNote: {
    marginLeft: '10px',
    fontStyle: 'italic',
    fontSize: '13px'
  },
  additionalInfo: {
    fontWeight: '600',
    fontSize: '14px',
    margin: '10px 0px'
  },
  ticketCardBody: {
    border: '1px solid black'
  }
}

export default styles
