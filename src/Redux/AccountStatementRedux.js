import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { listRequest, listSuccess, listFailure } from './genericReducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  accountStatementsListRequest: ['filters'],
  accountStatementsListSuccess: ['listData', 'listDataOffset', 'listDataTotal'],
  accountStatementsListFailure: ['listError'],

  accountStatementsReset: []
})

export const AccountStatementTypes = Types
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
  listDataOffset: state => state.accountStatement.listDataOffset
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_STATEMENTS_LIST_REQUEST]: listRequest,
  [Types.ACCOUNT_STATEMENTS_LIST_SUCCESS]: listSuccess,
  [Types.ACCOUNT_STATEMENTS_LIST_FAILURE]: listFailure,

  [Types.ACCOUNT_STATEMENTS_RESET]: reset
})
