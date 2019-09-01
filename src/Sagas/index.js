import { all, fork } from 'redux-saga/effects'
import authSaga from './AuthSagas'
import startupSaga from './StartupSagas'
import flightSaga from './FlightSagas'
import sectorSaga from './SectorSagas'
import ticketSaga from './TicketSagas'
import bookingSaga from './BookingSagas'
import userSaga from './UserSagas'
import API from 'Services/Api'

/* ------------- API ------------- */

const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    fork(authSaga, api),
    fork(startupSaga, api),
    fork(flightSaga, api),
    fork(sectorSaga, api),
    fork(ticketSaga, api),
    fork(bookingSaga, api),
    fork(userSaga, api)
  ])
}
