import { call, fork, all, takeLatest } from 'redux-saga/effects'
import { authorizeLoop } from 'Sagas/AuthSagas'
import { syncEntities } from 'Sagas/UtilitySagas'
import { pathOr } from 'ramda'
import { StartupTypes } from 'Redux/StartupRedux'
import store from 'store'

export function* startup(api) {
  const tokenData = store.get('tokenData')
  const refreshToken = pathOr(null, ['refreshToken'], tokenData)
  if (!refreshToken) return
  yield fork(api.setAuthToken, tokenData.accessToken)
  yield fork(syncEntities, api)
  yield call(authorizeLoop, api, tokenData, true)
}

export default function* authSagas(api) {
  yield all([takeLatest(StartupTypes.STARTUP, startup, api)])
}
