import { all, call, put, takeLatest } from 'redux-saga/effects'
import AccountStatementActions, {
  AccountStatementTypes
} from 'Redux/AccountStatementRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'

function* getAccountStatements(api, action) {
  const filters = action.filters || {}
  const resp = yield call(api.getAccountStatements, {
    $filters: JSON.stringify(filters)
  })
  if (resp.ok) {
    yield put(
      AccountStatementActions.accountStatementsListSuccess(resp.data.data)
    )
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(
      AccountStatementActions.accountStatementsListFailure(BuildErrorMsg(resp))
    )
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
