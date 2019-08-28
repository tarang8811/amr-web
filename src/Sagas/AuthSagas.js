import {
  all,
  call,
  put,
  select,
  fork,
  takeLatest,
  delay
} from 'redux-saga/effects'
import { DateTime } from 'luxon'
import AuthActions, { AuthSelectors, AuthTypes } from 'Redux/AuthRedux'
import { syncEntities } from 'Sagas/UtilitySagas'
import { BuildErrorMsg } from './ApiErrorMessages'
// import UIActions from '@Redux/UIRedux'

export function* onSignup(api, action) {
  const resp = yield call(api.signup, action.params)
  if (resp.ok) {
    yield call(onLogin, api, action)
  } else if (resp.data && resp.data.validationErrors) {
    yield put(
      AuthActions.signupFailure(
        resp.data.validationErrors.map(err => err.message).join('\n')
      )
    )
    action.failureCallback(BuildErrorMsg(resp))
  } else {
    yield put(AuthActions.signupFailure('something went wrong'))
  }
}

function* authorize(api, action, isRefresh = false) {
  if (isRefresh && !action.params.refresh_token) return
  const { ok, data } = yield call(api.login, action.params)
  if (ok) {
    yield call(api.setAuthToken, data.accessToken)
    const meData = yield call(api.me, data.accessToken)
    if (meData.ok) {
      yield put(AuthActions.userDataSuccess(meData.data))
      yield put(AuthActions.loginSuccess(data))
      // if refreshing the token call the actions on startup to refresh data
      if (isRefresh) {
        // sync entities will remove the loader
        yield fork(syncEntities, api)
      }
    }
    return data
  } else {
    // login sends only 400 error code and no validation error
    yield put(AuthActions.loginFailure('something went wrong'))
  }
  yield put(AuthActions.logout())
  return false
}

export function* authorizeLoop(api, tokenData) {
  while (tokenData.refreshToken) {
    const accessTokenExpiresIn =
      DateTime.fromISO(tokenData.accessTokenExpiresAt).ts -
      DateTime.local().ts -
      60000
    // Wait until we need to renew the token.
    if (accessTokenExpiresIn > 0) {
      yield delay(accessTokenExpiresIn)
    }
    // Verify if the token is still available after waiting
    // little less than 8hrs.
    tokenData = yield select(AuthSelectors.tokenData)
    if (!tokenData || !tokenData.refreshToken) {
      break
    }
    tokenData = yield call(
      authorize,
      api,
      {
        params: {
          grant_type: 'refresh_token',
          refresh_token: tokenData.refreshToken
        }
      },
      true
    )
  }
}

export function* onLogin(api, action) {
  const tokenData = yield call(authorize, api, action, false)
  if (tokenData) {
    yield fork(authorizeLoop, api, tokenData)
    yield fork(syncEntities, api)
  }
}

export function* fetchUserData(api) {
  const tokenData = yield select(AuthSelectors.tokenData)
  const resp = yield call(api.me, tokenData.accessToken)
  if (resp.ok) {
    yield put(AuthActions.userDataSuccess(resp.data))
  } else {
    yield put(AuthActions.userDataFailure('something went wrong'))
  }
}

function* saveUserData(api, { updatedData, successCallback, failureCallback }) {
  const orgId = yield select(AuthSelectors.orgId)
  const {
    auth: { userData }
  } = yield select()
  const resp = yield call(api.updateMe, orgId, {
    ...userData,
    ...updatedData
  })
  if (resp.ok) {
    // yield put(AuthActions.updateUserDataSuccess(data.data))
    const meData = yield call(api.me)
    if (meData.ok) {
      yield put(AuthActions.userDataSuccess(meData.data))
    }
    successCallback(resp.data)
  } else {
    failureCallback(BuildErrorMsg(resp))
  }
}

function* updateMe(api, { updatedData }) {
  const orgId = yield select(AuthSelectors.orgId)
  const {
    auth: { userData }
  } = yield select()
  const { ok } = yield call(api.updateMe, orgId, {
    ...userData,
    ...updatedData
  })
  if (ok) {
    const meData = yield call(api.me)
    if (meData.ok) {
      yield put(AuthActions.userDataSuccess(meData.data))
    }
  }
}

export function* updateUserProfile(api, { file }) {
  const orgId = yield select(AuthSelectors.orgId)
  const response = yield call(api.createFile, orgId, file)
  if (response.ok) {
    yield put(AuthActions.updateMeRequest({ profilePhoto: response.data }))
  } else {
    yield put(AuthActions.editProfilePhotoDailure(response.problem))
  }
}

function* changePassword(
  api,
  { currentPassword, newPassword, successCallback, failureCallback }
) {
  const { data, ok, problem } = yield call(
    api.changePassword,
    newPassword,
    currentPassword
  )
  if (ok) {
    successCallback()
  } else {
    if (data.validationErrors && data.validationErrors.length > 0) {
      failureCallback(data.validationErrors[0].message)
    } else {
      failureCallback(problem)
    }
  }
}

export function* onLogout(api) {
  yield call(api.deleteAuthToken)
}

export default function* authSagas(api) {
  yield all([
    takeLatest(AuthTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(AuthTypes.SIGNUP_REQUEST, onSignup, api),
    takeLatest(AuthTypes.LOGIN_REQUEST, onLogin, api),
    takeLatest(AuthTypes.USER_DATA_REQUEST, fetchUserData, api),
    takeLatest(AuthTypes.LOGOUT, onLogout, api),
    takeLatest(AuthTypes.USER_DATA_UPDATE_REQUEST, saveUserData, api),
    takeLatest(AuthTypes.UPDATE_ME_REQUEST, updateMe, api)
  ])
}
