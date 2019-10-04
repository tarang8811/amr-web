import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {
  listRequest,
  listSuccess,
  listFailure,
  createRequest,
  createSuccess,
  createFailure,
  updateRequest,
  updateSuccess,
  updateFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure
} from './genericReducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ticketsListRequest: ['filters'],
  ticketsListSuccess: ['listData', 'listDataOffset', 'listDataTotal'],
  ticketsListFailure: ['listError'],

  sectorTicketsListRequest: ['filters'],
  sectorTicketsListSuccess: ['sectorTickets'],

  ticketsCreateRequest: ['createParams'],
  ticketsCreateSuccess: ['createData'],
  ticketsCreateFailure: ['createError'],

  ticketsUpdateRequest: ['ticketId', 'updateParams'],
  ticketsUpdateSuccess: ['updateData'],
  ticketsUpdateFailure: ['updateError'],

  ticketsDeleteRequest: ['ticketId'],
  ticketsDeleteSuccess: ['deleteData'],
  ticketsDeleteFailure: ['deleteError'],

  ticketsReset: []
})

export const TicketTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  listData: [],
  listDataOffset: 0,
  listDataTotal: 0,
  listError: null,
  listFetching: false,

  sectorTickets: [],

  createData: {},
  createError: null,
  createFetching: false,

  updateData: {},
  updateError: null,
  updateFetching: false,

  deleteData: {},
  deleteError: null,
  deleteFetching: false
})

/* ------------- Reducers ------------- */

export const sectorTicketsListSuccess = (state, { sectorTickets }) => {
  return state.merge({ sectorTickets })
}

export const reset = state => INITIAL_STATE

export const TicketSelectors = {
  listDataOffset: state => state.tickets.listDataOffset
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TICKETS_LIST_REQUEST]: listRequest,
  [Types.TICKETS_LIST_SUCCESS]: listSuccess,
  [Types.TICKETS_LIST_FAILURE]: listFailure,

  [Types.SECTOR_TICKETS_LIST_SUCCESS]: sectorTicketsListSuccess,

  [Types.TICKETS_CREATE_REQUEST]: createRequest,
  [Types.TICKETS_CREATE_SUCCESS]: createSuccess,
  [Types.TICKETS_CREATE_FAILURE]: createFailure,

  [Types.TICKETS_UPDATE_REQUEST]: updateRequest,
  [Types.TICKETS_UPDATE_SUCCESS]: updateSuccess,
  [Types.TICKETS_UPDATE_FAILURE]: updateFailure,

  [Types.TICKETS_DELETE_REQUEST]: deleteRequest,
  [Types.TICKETS_DELETE_SUCCESS]: deleteSuccess,
  [Types.TICKETS_DELETE_FAILURE]: deleteFailure,

  [Types.TICKETS_RESET]: reset
})
