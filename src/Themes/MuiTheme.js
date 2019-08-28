import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#00B4FF' }
  },
  overrides: {
    MuiButtonBase: {
      root: {
        '&$focused': {
          outline: 'none !important'
        }
      }
    }
  }
})

export default theme
