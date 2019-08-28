import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { listRequest, listSuccess, listFailure } from './genericReducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  flightsListRequest: ['isLazyLoading'],
  flightsListSuccess: ['listData', 'listDataOffset', 'listDataTotal'],
  flightsListFailure: ['listError'],

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
  listFetching: false
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

  [Types.FLIGHTS_RESET]: reset
})
