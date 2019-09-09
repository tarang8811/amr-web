import { all, call, put, takeLatest } from 'redux-saga/effects'
import FlightActions, { FlightTypes } from 'Redux/FlightRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'
import UIActions from 'Redux/UIRedux'

function* getFlights(api, action) {
  yield put(UIActions.onToggleLoader(true))
  const filters = action.filters || {}
  const resp = yield call(api.getFlights, {
    $filters: JSON.stringify(filters),
    $order: '-updatedAt'
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
  yield put(UIActions.onToggleLoader(true))
  const resp = yield call(api.createFlight, action.createParams)
  if (resp.ok) {
    yield put(UIActions.onToggleLoader(false))
    yield put(FlightActions.flightsCreateSuccess(resp.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(FlightActions.flightsCreateFailure(BuildErrorMsg(resp)))
  }
}

function* updateFlight(api, action) {
  yield put(UIActions.onToggleLoader(true))
  const resp = yield call(
    api.updateFlight,
    action.flightId,
    action.updateParams
  )
  if (resp.ok) {
    yield put(UIActions.onToggleLoader(false))
    yield put(
      UIActions.onToggleNotification(
        'Your flight has been updated successfully'
      )
    )
    yield put(FlightActions.flightsUpdateSuccess(resp.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(UIActions.onToggleLoader(false))
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
