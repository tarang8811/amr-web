import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onToggleLoader: ['loaderState']
})

export const UITypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  showLoader: false
})

/* ------------- Reducers ------------- */

export const onToggleLoader = (state, { loaderState }) => {
  return state.merge({ showLoader: loaderState })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_TOGGLE_LOADER]: onToggleLoader
})
