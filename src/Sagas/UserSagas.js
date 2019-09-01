import { all, call, put, takeLatest } from 'redux-saga/effects'
import UserActions, { UserTypes } from 'Redux/UserRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'

function* getUsers(api, action) {
  const filters = action.filters || {}
  const resp = yield call(api.getUsers, {
    $filters: JSON.stringify(filters)
  })
  if (resp.ok) {
    yield put(UserActions.usersListSuccess(resp.data.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(UserActions.usersListFailure(BuildErrorMsg(resp)))
  }
}

function* updateUser(api, action) {
  const resp = yield call(api.updateUser, action.userId, action.updateParams)
  if (resp.ok) {
    yield put(UserActions.usersUpdateSuccess(resp.data.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(UserActions.usersUpdateFailure(BuildErrorMsg(resp)))
  }
}

export default function* userSagas(api) {
  yield all([
    takeLatest(UserTypes.USERS_LIST_REQUEST, getUsers, api),
    takeLatest(UserTypes.USERS_UPDATE_REQUEST, updateUser, api)
  ])
}
