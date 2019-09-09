import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { success } from './genericReducers'
import { path } from 'ramda'
import store from 'store'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['params'],
  loginSuccess: ['data'],
  loginFailure: ['error'],
  loginReset: [],
  logout: [],

  userDataRequest: [],
  userDataSuccess: ['userData'],
  userDataFailure: [],

  userDataUpdateRequest: ['updatedData', 'successCallback', 'failureCallback'],

  changePasswordRequest: [
    'currentPassword',
    'newPassword',
    'successCallback',
    'failureCallback'
  ],
  changePasswordSuccess: ['updateObjectId', 'updateBody', 'token'],
  changePasswordFailure: ['error'],

  signupRequest: ['params', 'failureCallback'],
  signupSuccess: ['data'],
  signupFailure: ['error'],

  changePassword: ['passwordParams'],
  updateMeRequest: ['updatedData']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const initialData = { accessToken: null }

const resetState = {
  fetching: null,
  error: null,
  passwordError: null
}

export const INITIAL_STATE = Immutable({
  ...resetState,
  data: initialData,
  userData: {},
  error: null,
  username: null,
  updateObjectId: null,
  updateBody: null
})

/* ------------- Reducers ------------- */

// request the data for a auth
export const request = (state, { params }) =>
  state.merge({
    fetching: true,
    username: params.username,
    data: initialData,
    error: null
  })

export const logout = state => {
  store.clearAll()
  return state.merge({ ...resetState, data: { ...initialData }, userData: {} })
}

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const reset = state => state.merge(resetState)

export const userUpdateRequest = (state, { updateObjectId, updateBody }) =>
  state.merge({
    updateObjectId,
    updateBody,
    fetching: true,
    passwordError: false,
    error: null
  })

export const userUpdateSuccess = state =>
  state.merge({
    fetching: false,
    data: {
      ...state.data,
      ...state.updateBody
    },
    updateObjectId: null,
    updateBody: null
  })

export const loginCheck = state =>
  state.merge({ fetching: true, passwordError: false })

export const loginChangePassword = (state, { data }) =>
  state.merge({ fetching: false, passwordError: false })

export const loginCheckFailed = (state, { error }) =>
  state.merge({ fetching: false, passwordError: true })

export const userDataSuccess = (state, { userData }) => {
  store.set('userData', userData)
  return state.merge({ userData })
}

export const clearErrors = state =>
  state.merge({ error: null, passwordError: null })

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  accessToken: _ => {
    const tokenData = store.get('tokenData')
    path(['accessToken'], tokenData)
  },
  tokenData: _ => store.get('tokenData'),
  userId: _ => {
    const userData = store.get('userData')
    return path(['id'], userData)
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,

  [Types.USER_DATA_SUCCESS]: userDataSuccess,
  [Types.SIGNUP_REQUEST]: request,
  [Types.SIGNUP_SUCCESS]: success,
  [Types.SIGNUP_FAILURE]: failure,
  [Types.LOGIN_RESET]: reset
})
