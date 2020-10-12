import {
  CONFIG_SAVE_FETCH,
  CONFIG_SAVE_SUCCESS,
  CONFIG_SAVE_ERROR
} from '../../../constants/action-types'

const INIT_STATE = {
  success: false,
  error: null,
  loading: false,
}

const save = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CONFIG_SAVE_FETCH:
      return { ...state, error: null, loading: true }
    case CONFIG_SAVE_SUCCESS:
      return { ...state, success: true, loading: false }
    case CONFIG_SAVE_ERROR:
      return { ...state, error: action.payload.error, loading: false }
    default:
      return state
  }
}

export default save