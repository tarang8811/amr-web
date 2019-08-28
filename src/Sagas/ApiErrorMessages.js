import { path } from 'ramda'

export const ACTION_TYPES_TO_MESSAGE = {
  put: 'edit',
  post: 'create',
  get: 'fetch',
  delete: 'delete'
}

const ApiErrorMessages = {
  CLIENT_ERROR: 'Sorry something went wrong at the client end.',
  SERVER_ERROR: 'Sorry there was internal server error. Please try again',
  TIMEOUT_ERROR: 'Request timed out.',
  CONNECTION_ERROR: 'Unable to reach our servers.',
  NETWORK_ERROR: 'Unable to reach our servers.',
  CANCEL_ERROR: ''
}

export const BuildErrorMsg = (resp, entity, actionType) => {
  const errors = path(['validationErrors'], resp.data)
  if (errors) {
    if (Array.isArray(errors)) {
      return errors[0].message
    }
  }
  return ApiErrorMessages[resp.problem]
}

export default ApiErrorMessages
