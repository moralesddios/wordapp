import {
  BOOK_LIST_FETCH,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_ERROR
} from '../../constants/action-types'

const INIT_STATE = {
  data: [],
  success: false,
  error: null,
  loading: false,
}

const book = (state = INIT_STATE, action) => {
  switch (action.type) {
    case BOOK_LIST_FETCH:
      return { ...state, data: [], error: null, loading: true }
    case BOOK_LIST_SUCCESS:
      return { ...state, data: action.payload.data, success: true, loading: false }
    case BOOK_LIST_ERROR:
      return { ...state, error: action.payload.error, loading: false }
    default:
      return state
  }
}

export default book