import {
  MARK_SAVE_FETCH,
  MARK_SAVE_SUCCESS,
  MARK_SAVE_ERROR
} from '../../../constants/action-types'

const INIT_STATE = {
  success: false,
  error: null,
  loading: false,
}

const save = (state = INIT_STATE, action) => {
  switch (action.type) {
    case MARK_SAVE_FETCH:
      return { ...state, error: null, loading: true }
    case MARK_SAVE_SUCCESS:
      return { ...state, success: true, loading: false }
    case MARK_SAVE_ERROR:
      return { ...state, error: action.payload.error, loading: false }
    default:
      return state
  }
}

export default save