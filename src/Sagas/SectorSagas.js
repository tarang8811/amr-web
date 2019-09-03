import { all, call, put, takeLatest } from 'redux-saga/effects'
import SectorActions, { SectorTypes } from 'Redux/SectorRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'
import UIActions from 'Redux/UIRedux'

function* getSectors(api) {
  yield put(UIActions.onToggleLoader(true))
  const resp = yield call(api.getSectors)
  if (resp.ok) {
    yield put(SectorActions.sectorsListSuccess(resp.data.data))
    yield put(UIActions.onToggleLoader(false))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(SectorActions.sectorsListFailure(BuildErrorMsg(resp)))
    yield put(UIActions.onToggleLoader(false))
  }
}

export default function* sectorSagas(api) {
  yield all([takeLatest(SectorTypes.SECTORS_LIST_REQUEST, getSectors, api)])
}
