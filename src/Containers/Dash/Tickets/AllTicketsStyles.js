import { successColor, dangerColor } from 'css/Helpers'
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
  pnrList: {
    marginLeft: '10px'
  },
  tableCard: {
    paddingLeft: '24px',
    paddingRight: '24px'
  },
  active: {
    color: successColor[0]
  },
  inactive: {
    color: dangerColor[0]
  }
}

export default styles
