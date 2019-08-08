import React from 'react';
import ReactDOM from 'react-dom';

// Required for Redux store setup
import { Provider } from 'react-redux';
import createStore from './Redux';

import './index.css';
import App from './App';
import serviceWorker from './serviceWorker';

require('dotenv').config();

const { store } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker();
