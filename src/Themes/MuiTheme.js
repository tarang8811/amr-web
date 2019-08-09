import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#00B4FF' }
  },
  overrides: {
    MuiButton: {
      label: {
        color: 'white'
      }
    }
  }
})

export default theme
