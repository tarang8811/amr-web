import { all, call, put, takeLatest } from 'redux-saga/effects'
import FlightActions, { FlightTypes } from 'Redux/FlightRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'

function* getFlights(api) {
  const resp = yield call(api.getFlights)
  if (resp.ok) {
    yield put(FlightActions.flightsListSuccess(resp.data.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(FlightActions.flightsListFailure(BuildErrorMsg(resp)))
  }
}

export default function* flightSagas(api) {
  yield all([takeLatest(FlightTypes.FLIGHTS_LIST_REQUEST, getFlights, api)])
}
