import {
  REMOVE_MARK_FETCH,
  REMOVE_MARK_SUCCESS,
  REMOVE_MARK_ERROR
} from '../../../constants/action-types'

const INIT_STATE = {
  success: false,
  error: null,
  loading: false,
}

const remove = (state = INIT_STATE, action) => {
  switch (action.type) {
    case REMOVE_MARK_FETCH:
      return { ...state, error: null, loading: true }
    case REMOVE_MARK_SUCCESS:
      return { ...state, success: true, loading: false }
    case REMOVE_MARK_ERROR:
      return { ...state, error: action.payload.error, loading: false }
    default:
      return state
  }
}

export default remove