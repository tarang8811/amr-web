import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { listRequest, listSuccess, listFailure } from './genericReducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  usersListRequest: ['filters'],
  usersListSuccess: ['listData', 'listDataOffset', 'listDataTotal'],
  usersListFailure: ['listError'],

  usersReset: []
})

export const UserTypes = Types
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

export const UserSelectors = {
  listDataOffset: state => state.user.listDataOffset
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USERS_LIST_REQUEST]: listRequest,
  [Types.USERS_LIST_SUCCESS]: listSuccess,
  [Types.USERS_LIST_FAILURE]: listFailure,

  [Types.USERS_RESET]: reset
})
