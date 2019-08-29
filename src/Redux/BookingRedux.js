import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {
  listRequest,
  listSuccess,
  listFailure,
  createRequest,
  createSuccess,
  createFailure,
  updateRequest,
  updateSuccess,
  updateFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure
} from './genericReducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bookingListRequest: ['filters'],
  bookingListSuccess: ['listData', 'listDataOffset', 'listDataTotal'],
  bookingListFailure: ['listError'],

  bookingCreateRequest: ['createParams'],
  bookingCreateSuccess: ['createData'],
  bookingCreateFailure: ['createError'],

  bookingUpdateRequest: ['bookingId', 'updateParams'],
  bookingUpdateSuccess: ['updateData'],
  bookingUpdateFailure: ['updateError'],

  bookingDeleteRequest: ['bookingId'],
  bookingDeleteSuccess: ['deleteData'],
  bookingDeleteFailure: ['deleteError'],

  bookingReset: []
})

export const BookingTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  listData: [],
  listDataOffset: 0,
  listDataTotal: 0,
  listError: null,
  listFetching: false,

  createData: {},
  createError: null,
  createFetching: false,

  updateData: {},
  updateError: null,
  updateFetching: false,

  deleteData: {},
  deleteError: null,
  deleteFetching: false
})

/* ------------- Reducers ------------- */

export const reset = state => INITIAL_STATE

export const BookingSelectors = {
  listDataOffset: state => state.booking.listDataOffset
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BOOKING_LIST_REQUEST]: listRequest,
  [Types.BOOKING_LIST_SUCCESS]: listSuccess,
  [Types.BOOKING_LIST_FAILURE]: listFailure,

  [Types.BOOKING_CREATE_REQUEST]: createRequest,
  [Types.BOOKING_CREATE_SUCCESS]: createSuccess,
  [Types.BOOKING_CREATE_FAILURE]: createFailure,

  [Types.BOOKING_UPDATE_REQUEST]: updateRequest,
  [Types.BOOKING_UPDATE_SUCCESS]: updateSuccess,
  [Types.BOOKING_UPDATE_FAILURE]: updateFailure,

  [Types.BOOKING_DELETE_REQUEST]: deleteRequest,
  [Types.BOOKING_DELETE_SUCCESS]: deleteSuccess,
  [Types.BOOKING_DELETE_FAILURE]: deleteFailure,

  [Types.BOOKING_RESET]: reset
})
