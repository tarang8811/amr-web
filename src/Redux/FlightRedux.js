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
  updateFailure
} from './genericReducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  flightsListRequest: ['filters'],
  flightsListSuccess: ['listData', 'listDataOffset', 'listDataTotal'],
  flightsListFailure: ['listError'],

  flightsCreateRequest: ['createParams'],
  flightsCreateSuccess: ['createData'],
  flightsCreateFailure: ['createError'],

  flightsUpdateRequest: ['flightId', 'updateParams'],
  flightsUpdateSuccess: ['updateData'],
  flightsUpdateFailure: ['updateError'],

  flightsReset: []
})

export const FlightTypes = Types
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
  updateFetching: false
})

/* ------------- Reducers ------------- */

export const reset = state => INITIAL_STATE

export const FlightSelectors = {
  listDataOffset: state => state.flights.listDataOffset
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FLIGHTS_LIST_REQUEST]: listRequest,
  [Types.FLIGHTS_LIST_SUCCESS]: listSuccess,
  [Types.FLIGHTS_LIST_FAILURE]: listFailure,

  [Types.FLIGHTS_CREATE_REQUEST]: createRequest,
  [Types.FLIGHTS_CREATE_SUCCESS]: createSuccess,
  [Types.FLIGHTS_CREATE_FAILURE]: createFailure,

  [Types.FLIGHTS_UPDATE_REQUEST]: updateRequest,
  [Types.FLIGHTS_UPDATE_SUCCESS]: updateSuccess,
  [Types.FLIGHTS_UPDATE_FAILURE]: updateFailure,

  [Types.FLIGHTS_RESET]: reset
})
