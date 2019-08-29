import { all, call, put, takeLatest } from 'redux-saga/effects'
import SectorActions, { SectorTypes } from 'Redux/SectorRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'

function* getSectors(api) {
  const resp = yield call(api.getSectors)
  if (resp.ok) {
    yield put(SectorActions.sectorsListSuccess(resp.data.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(SectorActions.sectorsListFailure(BuildErrorMsg(resp)))
  }
}

export default function* sectorSagas(api) {
  yield all([takeLatest(SectorTypes.SECTORS_LIST_REQUEST, getSectors, api)])
}
