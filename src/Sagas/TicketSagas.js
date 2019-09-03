import { all, call, put, takeLatest } from 'redux-saga/effects'
import TicketActions, { TicketTypes } from 'Redux/TicketRedux'
import ApiErrorMessages, { BuildErrorMsg } from './ApiErrorMessages'
import { ItemsPerPage } from 'Redux/genericReducers'
import UIActions from 'Redux/UIRedux'

function* getTickets(api, action) {
  yield put(UIActions.onToggleLoader(true))
  const filters = action.filters || {}
  const resp = yield call(api.getTickets, {
    $filters: JSON.stringify(filters)
  })
  if (resp.ok) {
    yield put(
      TicketActions.ticketsListSuccess(
        resp.data.data,
        resp.data.offset + ItemsPerPage,
        resp.data.total
      )
    )
    yield put(UIActions.onToggleLoader(false))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(TicketActions.ticketsListFailure(BuildErrorMsg(resp)))
    yield put(UIActions.onToggleLoader(false))
  }
}

function* createTicket(api, action) {
  const resp = yield call(api.createTicket, action.createParams)
  if (resp.ok) {
    yield put(TicketActions.ticketsCreateSuccess(resp.data.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(TicketActions.ticketsCreateFailure(BuildErrorMsg(resp)))
  }
}

function* updateTicket(api, action) {
  const resp = yield call(
    api.updateTicket,
    action.ticketId,
    action.updateParams
  )
  if (resp.ok) {
    yield put(TicketActions.ticketsUpdateSuccess(resp.data.data))
  } else if (ApiErrorMessages[resp.problem]) {
    yield put(TicketActions.ticketsUpdateFailure(BuildErrorMsg(resp)))
  }
}

export default function* ticketSagas(api) {
  yield all([
    takeLatest(TicketTypes.TICKETS_LIST_REQUEST, getTickets, api),
    takeLatest(TicketTypes.TICKETS_CREATE_REQUEST, createTicket, api),
    takeLatest(TicketTypes.TICKETS_UPDATE_REQUEST, updateTicket, api)
  ])
}
