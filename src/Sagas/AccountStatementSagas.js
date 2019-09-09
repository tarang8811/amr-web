import { all, call, put, takeLatest } from 'redux-saga/effects'
import AccountStatementActions, {
  AccountStatementTypes
} from 'Redux/AccountStatementRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'
import UIActions from 'Redux/UIRedux'

function* getAccountStatements(api, action) {
  yield put(UIActions.onToggleLoader(true))
  const filters = action.filters || {}
  const resp = yield call(api.getAccountStatements, {
    $filters: JSON.stringify(filters),
    $order: '-paymentDate'
  })
  if (resp.ok) {
    yield put(
      AccountStatementActions.accountStatementsListSuccess(resp.data.data)
    )
    yield put(UIActions.onToggleLoader(false))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(
      AccountStatementActions.accountStatementsListFailure(BuildErrorMsg(resp))
    )
    yield put(UIActions.onToggleLoader(false))
  }
}

export default function* rleSagas(api) {
  yield all([
    takeLatest(
      AccountStatementTypes.ACCOUNT_STATEMENTS_LIST_REQUEST,
      getAccountStatements,
      api
    )
  ])
}
