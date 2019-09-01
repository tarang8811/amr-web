import { all, call, put, takeLatest } from 'redux-saga/effects'
import RoleActions, { RoleTypes } from 'Redux/RoleRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'

function* getRoles(api, action) {
  const filters = action.filters || {}
  const resp = yield call(api.getRoles, {
    $filters: JSON.stringify(filters)
  })
  if (resp.ok) {
    yield put(RoleActions.rolesListSuccess(resp.data.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(RoleActions.rolesListFailure(BuildErrorMsg(resp)))
  }
}

export default function* rleSagas(api) {
  yield all([takeLatest(RoleTypes.ROLES_LIST_REQUEST, getRoles, api)])
}
