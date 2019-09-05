import { createMuiTheme } from '@material-ui/core/styles'
import { primaryColor, grayColor, defaultFont } from 'css/Helpers'

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#00B4FF' }
  },
  overrides: {
    MuiButtonBase: {
      root: {
        '&$focused': {
          outline: 'none !important'
        },
        fontWeight: '500'
      }
    },
    MuiInputBase: {
      root: {
        fontWeight: '500',
        fontSize: '15px',
        borderColor: '#D2D2D2 !important'
      }
    },
    MuiFormLabel: {
      root: {
        color: '#AAAAAA !important',
        fontSize: '14px'
      }
    },
    MuiInput: {
      underline: {
        '&:hover:not($disabled):before,&:before': {
          borderColor: grayColor[4] + ' !important',
          borderWidth: '1px !important'
        },
        '&:after': {
          borderColor: primaryColor[0] + ' !important'
        }
      }
    },
    MuiTableCell: {
      root: {
        ...defaultFont,
        lineHeight: '1.42857143',
        padding: '12px 8px',
        verticalAlign: 'middle',
        fontSize: '0.8125rem'
      }
    },
    MUIDataTable: {
      paper: {
        boxShadow: 'none'
      }
    },
    MUIDataTableToolbar: {
      root: {
        paddingLeft: '0px',
        paddingRight: '0px'
      }
    }
  }
})

export default theme
