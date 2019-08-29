import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { listRequest, listSuccess, listFailure } from './genericReducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sectorsListRequest: ['isLazyLoading'],
  sectorsListSuccess: ['listData', 'listDataOffset', 'listDataTotal'],
  sectorsListFailure: ['listError'],

  sectorsReset: []
})

export const SectorTypes = Types
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

export const SectorSelectors = {
  listDataOffset: state => state.sectors.listDataOffset
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SECTORS_LIST_REQUEST]: listRequest,
  [Types.SECTORS_LIST_SUCCESS]: listSuccess,
  [Types.SECTORS_LIST_FAILURE]: listFailure,

  [Types.SECTORS_RESET]: reset
})
