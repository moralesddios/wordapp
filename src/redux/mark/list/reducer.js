import {
  MARK_LIST_FETCH,
  MARK_LIST_SUCCESS,
  MARK_LIST_ERROR
} from '../../../constants/action-types'

const INIT_STATE = {
  data: {},
  success: false,
  error: null,
  loading: false,
}

const list = (state = INIT_STATE, action) => {
  switch (action.type) {
    case MARK_LIST_FETCH:
      return { ...state, error: null, loading: true }
    case MARK_LIST_SUCCESS:
      return { ...state, data: action.payload.data, success: true, loading: false }
    case MARK_LIST_ERROR:
      return { ...state, error: action.payload.error, loading: false }
    default:
      return state
  }
}

export default list