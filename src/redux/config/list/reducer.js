import {
  CONFIG_LIST_FETCH,
  CONFIG_LIST_SUCCESS,
  CONFIG_LIST_ERROR
} from '../../../constants/action-types'

const INIT_STATE = {
  data: {},
  success: false,
  error: null,
  loading: false,
}

const list = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CONFIG_LIST_FETCH:
      return { ...state, error: null, loading: true }
    case CONFIG_LIST_SUCCESS:
      return { ...state, data: action.payload.data, success: true, loading: false }
    case CONFIG_LIST_ERROR:
      return { ...state, error: action.payload.error, loading: false }
    default:
      return state
  }
}

export default list