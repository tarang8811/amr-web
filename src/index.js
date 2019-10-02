import 'Config/reactotron'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import React from 'react'
import ReactDOM from 'react-dom'
import HttpsRedirect from 'react-https-redirect'

// Required for Redux store setup
import { Provider } from 'react-redux'
import createStore from './Redux'

import './index.css'
import App from './App'
import serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from 'Themes/MuiTheme'
import 'css/material-dashboard-react.css?v=1.7.0'

const { store } = createStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HttpsRedirect>
          <App />
        </HttpsRedirect>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
serviceWorker()
