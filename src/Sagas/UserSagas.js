import { all, call, put, takeLatest } from 'redux-saga/effects'
import UserActions, { UserTypes } from 'Redux/UserRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'
import UIActions from 'Redux/UIRedux'

function* getUsers(api, action) {
  yield put(UIActions.onToggleLoader(true))
  const filters = action.filters || {}
  const resp = yield call(api.getUsers, {
    $filters: JSON.stringify(filters),
    $order: '-updatedAt'
  })
  if (resp.ok) {
    yield put(UserActions.usersListSuccess(resp.data.data))
    yield put(UIActions.onToggleLoader(false))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(UserActions.usersListFailure(BuildErrorMsg(resp)))
    yield put(UIActions.onToggleLoader(false))
  }
}

function* updateUser(api, action) {
  yield put(UIActions.onToggleLoader(true))
  const resp = yield call(api.updateUser, action.userId, action.updateParams)
  if (resp.ok) {
    yield put(UIActions.onToggleLoader(false))
    yield put(
      UIActions.onToggleNotification('Your user has been updated successfully')
    )
    yield put(UserActions.usersUpdateSuccess(resp.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(UIActions.onToggleLoader(false))
    yield put(UserActions.usersUpdateFailure(BuildErrorMsg(resp)))
  }
}

export default function* userSagas(api) {
  yield all([
    takeLatest(UserTypes.USERS_LIST_REQUEST, getUsers, api),
    takeLatest(UserTypes.USERS_UPDATE_REQUEST, updateUser, api)
  ])
}
