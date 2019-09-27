import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import BookingActions, { BookingTypes } from 'Redux/BookingRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'
import { ItemsPerPage } from 'Redux/genericReducers'
import { AuthSelectors } from 'Redux/AuthRedux'
import UIActions from 'Redux/UIRedux'
import AuthActions from 'Redux/AuthRedux'
import { NOTIFICATION_TYPES } from 'Themes/constants'

function* getBookings(api, action) {
  yield put(UIActions.onToggleLoader(true))
  const userId = yield select(AuthSelectors.userId)
  const filters = action.filters || {}
  const resp = yield call(api.getBookings, userId, {
    $filters: JSON.stringify(filters)
  })
  if (resp.ok) {
    yield put(
      BookingActions.bookingListSuccess(
        resp.data.data,
        resp.data.offset + ItemsPerPage,
        resp.data.total
      )
    )
    yield put(UIActions.onToggleLoader(false))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(BookingActions.bookingListFailure(BuildErrorMsg(resp)))
    yield put(UIActions.onToggleLoader(false))
  }
}

function* createBooking(api, action) {
  yield put(UIActions.onToggleLoader(true))
  const userId = yield select(AuthSelectors.userId)
  const resp = yield call(api.createBooking, userId, action.createParams)
  if (resp.ok) {
    yield put(UIActions.onToggleLoader(false))
    yield put(BookingActions.bookingCreateSuccess(resp.data))
    // refetch user data
    yield put(AuthActions.userDataRequest())
    yield put(
      UIActions.onToggleNotification('Your ticket was booked successfully')
    )
  } else if (ApiErrorMessages[resp.problem]) {
    const message = BuildErrorMsg(resp)
    yield put(UIActions.onToggleLoader(false))
    yield put(UIActions.onToggleNotification(message, NOTIFICATION_TYPES.error))
    yield put(BookingActions.bookingCreateFailure(message))
  }
}

function* updateBooking(api, action) {
  const userId = yield select(AuthSelectors.userId)
  const resp = yield call(
    api.updateBooking,
    userId,
    action.bookingId,
    action.updateParams
  )
  if (resp.ok) {
    yield put(BookingActions.bookingUpdateSuccess(resp.data.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(BookingActions.bookingUpdateFailure(BuildErrorMsg(resp)))
  }
}

export default function* bookingSagas(api) {
  yield all([
    takeLatest(BookingTypes.BOOKING_LIST_REQUEST, getBookings, api),
    takeLatest(BookingTypes.BOOKING_CREATE_REQUEST, createBooking, api),
    takeLatest(BookingTypes.BOOKING_UPDATE_REQUEST, updateBooking, api)
  ])
}
