export const ItemsPerPage = 100

// successful data lookup
export const success = (state, action) => {
  const { data } = action
  return state.merge({
    fetching: false,
    error: null,
    data: data.results || data
  })
}

export const listRequest = (state, { listParams }) => {
  return state.merge({ listParams, listFetching: true, listError: null })
}

export const listSuccess = (
  state,
  { listData, listDataOffset, listDataTotal }
) => {
  if (listDataOffset > ItemsPerPage) {
    return state.merge({
      listData: state.listData.concat(listData),
      listFetching: false,
      listDataOffset: listDataOffset,
      listDataTotal: listDataTotal
    })
  }
  return state.merge({
    listData,
    listFetching: false,
    listDataOffset: listDataOffset,
    listDataTotal: listDataTotal
  })
}

export const listFailure = (state, { listError }) => {
  return state.merge({ listError, listFetching: false })
}

export const createRequest = (state, { createParams }) => {
  return state.merge({ createParams, createFetching: true, createError: null })
}

export const createSuccess = (state, { createData }) => {
  return state.merge({ createData, createFetching: false })
}

export const createFailure = (state, { createError }) => {
  return state.merge({ createError, createFetching: false })
}

export const updateRequest = (state, { updateParams }) => {
  return state.merge({ updateParams, updateFetching: true, updateError: null })
}

export const updateSuccess = (state, { updateData }) => {
  return state.merge({ updateData, updateFetching: false })
}

export const updateFailure = (state, { updateError }) => {
  return state.merge({ updateError, updateFetching: false })
}

export const deleteRequest = state => {
  return state.merge({ deleteFetching: true, deleteError: null })
}

export const deleteSuccess = (state, { deleteData }) => {
  return state.merge({ deleteData, deleteFetching: false })
}

export const deleteFailure = (state, { deleteError }) => {
  return state.merge({ deleteError, deleteFetching: false })
}
