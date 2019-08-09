import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'

// Required for Redux store setup
import { Provider } from 'react-redux'
import createStore from './Redux'

import './index.css'
import App from './App'
import serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from 'Themes/MuiTheme'

const { store } = createStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
serviceWorker()
