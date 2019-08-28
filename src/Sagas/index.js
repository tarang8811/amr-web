// import API from '../Services/Api';
import { all, fork } from 'redux-saga/effects'
import authSaga from './AuthSagas'
import startupSaga from './StartupSagas'
import flightSaga from './FlightSagas'
import ticketSaga from './TicketSagas'
import API from 'Services/Api'

/* ------------- API ------------- */

const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    fork(authSaga, api),
    fork(startupSaga, api),
    fork(flightSaga, api),
    fork(ticketSaga, api)
  ])
}
