import { put } from 'redux-saga/effects'
import AuthActions from 'Redux/AuthRedux'

export function* syncEntities() {
  yield put(AuthActions.userDataRequest())
}
