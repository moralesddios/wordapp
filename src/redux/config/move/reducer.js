import {
  CONFIG_MOVE_FETCH,
  CONFIG_MOVE_SUCCESS,
  CONFIG_MOVE_ERROR
} from '../../../constants/action-types'

const INIT_STATE = {
  success: false,
  error: null,
  loading: false,
}

const move = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CONFIG_MOVE_FETCH:
      return { ...state, error: null, loading: true }
    case CONFIG_MOVE_SUCCESS:
      return { ...state, success: true, loading: false }
    case CONFIG_MOVE_ERROR:
      return { ...state, error: action.payload.error, loading: false }
    default:
      return state
  }
}

export default move