import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import BookingActions, { BookingTypes } from 'Redux/BookingRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'
import { ItemsPerPage } from 'Redux/genericReducers'
import { AuthSelectors } from 'Redux/AuthRedux'

function* getBookings(api, action) {
  const filters = action.filters || {}
  const resp = yield call(api.getBookings, {
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
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(BookingActions.bookingListFailure(BuildErrorMsg(resp)))
  }
}

function* createBooking(api, action) {
  const userId = yield select(AuthSelectors.userId)
  const resp = yield call(api.createBooking, userId, action.createParams)
  if (resp.ok) {
    yield put(BookingActions.bookingCreateSuccess(resp.data.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(BookingActions.bookingCreateFailure(BuildErrorMsg(resp)))
  }
}

function* updateBooking(api, action) {
  const userId = select(AuthSelectors.userId)
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
