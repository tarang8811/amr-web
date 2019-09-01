import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { listRequest, listSuccess, listFailure } from './genericReducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rolesListRequest: ['filters'],
  rolesListSuccess: ['listData', 'listDataOffset', 'listDataTotal'],
  rolesListFailure: ['listError'],

  rolesReset: []
})

export const RoleTypes = Types
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

export const RoleSelectors = {
  listDataOffset: state => state.user.listDataOffset
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ROLES_LIST_REQUEST]: listRequest,
  [Types.ROLES_LIST_SUCCESS]: listSuccess,
  [Types.ROLES_LIST_FAILURE]: listFailure,

  [Types.ROLES_RESET]: reset
})
