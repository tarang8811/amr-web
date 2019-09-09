import { all, fork } from 'redux-saga/effects'
import authSaga from './AuthSagas'
import startupSaga from './StartupSagas'
import flightSaga from './FlightSagas'
import sectorSaga from './SectorSagas'
import ticketSaga from './TicketSagas'
import bookingSaga from './BookingSagas'
import userSaga from './UserSagas'
import roleSaga from './RoleSagas'
import passengerSaga from './PassengerSagas'
import accountStatementSaga from './AccountStatementSagas'
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
    fork(roleSaga, api),
    fork(accountStatementSaga, api),
    fork(passengerSaga, api),
    fork(userSaga, api)
  ])
}
