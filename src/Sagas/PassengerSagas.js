import { all, call, put, takeLatest } from 'redux-saga/effects'
import PassengerActions, { PassengerTypes } from 'Redux/PassengerRedux'
import { BuildErrorMsg } from './ApiErrorMessages'
import UIActions from 'Redux/UIRedux'
import { NOTIFICATION_TYPES } from 'Themes/constants'

function* updatePassengers(api, action) {
  yield put(UIActions.onToggleLoader(true))
  const responses = []
  for (var i = 0; i < action.updateParamsArray.length; i++) {
    const resp = yield call(
      api.updatePassenger,
      action.updateParamsArray[i].id,
      action.updateParamsArray[i]
    )
    if (resp.ok) {
      responses.push(resp.data)
    }
  }
  if (responses.length === action.updateParamsArray.length) {
    yield put(UIActions.onToggleLoader(false))
    yield put(
      UIActions.onToggleNotification(
        'Your passengers have been updated successfully'
      )
    )
    yield put(PassengerActions.passengersUpdateSuccess(''))
  } else {
    yield put(UIActions.onToggleLoader(false))
    yield put(
      UIActions.onToggleNotification(
        'There was an error saving the data. Please try again',
        NOTIFICATION_TYPES.error
      )
    )
  }
}

export default function* ticketSagas(api) {
  yield all([
    takeLatest(PassengerTypes.PASSENGERS_UPDATE_REQUEST, updatePassengers, api)
  ])
}
