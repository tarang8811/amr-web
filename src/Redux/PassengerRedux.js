import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { updateRequest, updateSuccess, updateFailure } from './genericReducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  passengersUpdateRequest: ['updateParamsArray'],
  passengersUpdateSuccess: ['updateData'],
  passengersUpdateFailure: ['updateError'],

  passengerReset: []
})

export const PassengerTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  updateData: {},
  updateError: null,
  updateFetching: false
})

/* ------------- Reducers ------------- */

export const reset = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PASSENGERS_UPDATE_REQUEST]: updateRequest,
  [Types.PASSENGERS_UPDATE_SUCCESS]: updateSuccess,
  [Types.PASSENGERS_UPDATE_FAILURE]: updateFailure,

  [Types.PASSENGER_RESET]: reset
})
