import { all, call, put, takeLatest } from 'redux-saga/effects'
import FlightActions, { FlightTypes } from 'Redux/FlightRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'
import UIActions from 'Redux/UIRedux'

function* getFlights(api, action) {
  yield put(UIActions.onToggleLoader(true))
  const filters = action.filters || {}
  const resp = yield call(api.getFlights, {
    $filters: JSON.stringify(filters)
  })
  if (resp.ok) {
    yield put(FlightActions.flightsListSuccess(resp.data.data))
    yield put(UIActions.onToggleLoader(false))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(FlightActions.flightsListFailure(BuildErrorMsg(resp)))
    yield put(UIActions.onToggleLoader(false))
  }
}

function* createFlight(api, action) {
  const resp = yield call(api.createFlight, action.createParams)
  if (resp.ok) {
    yield put(FlightActions.flightsCreateSuccess(resp.data.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(FlightActions.flightsCreateFailure(BuildErrorMsg(resp)))
  }
}

function* updateFlight(api, action) {
  const resp = yield call(
    api.updateFlight,
    action.flightid,
    action.updateParams
  )
  if (resp.ok) {
    yield put(FlightActions.flightsUpdateSuccess(resp.data.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(FlightActions.flightsUpdateFailure(BuildErrorMsg(resp)))
  }
}

export default function* flightSagas(api) {
  yield all([
    takeLatest(FlightTypes.FLIGHTS_LIST_REQUEST, getFlights, api),
    takeLatest(FlightTypes.FLIGHTS_CREATE_REQUEST, createFlight, api),
    takeLatest(FlightTypes.FLIGHTS_UPDATE_REQUEST, updateFlight, api)
  ])
}
