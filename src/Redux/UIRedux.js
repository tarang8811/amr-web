import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { NOTIFICATION_TYPES } from 'Themes/constants'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onToggleLoader: ['loaderState'],
  onToggleNotification: ['successMessage', 'notificationType']
})

export const UITypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  showLoader: false,
  successMessage: '',
  notificationType: ''
})

/* ------------- Reducers ------------- */

export const onToggleLoader = (state, { loaderState }) => {
  return state.merge({ showLoader: loaderState })
}

export const onToggleNotification = (
  state,
  { successMessage, notificationType = NOTIFICATION_TYPES.success }
) => {
  return state.merge({ successMessage, notificationType })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_TOGGLE_LOADER]: onToggleLoader,
  [Types.ON_TOGGLE_NOTIFICATION]: onToggleNotification
})
