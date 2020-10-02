import {
  CURRENT_BOOK_FETCH,
  CURRENT_BOOK_SUCCESS,
  CURRENT_BOOK_ERROR
} from '../../constants/action-types'

const INIT_STATE = {
  bookname: '',
  total: 0,
  success: false,
  error: null,
  loading: false,
}

const current = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CURRENT_BOOK_FETCH:
      return { ...state, error: null, loading: true }
    case CURRENT_BOOK_SUCCESS:
      return { ...state, bookname: action.payload.bookname, total: action.payload.total, success: true, loading: false }
    case CURRENT_BOOK_ERROR:
      return { ...state, error: action.payload.error, loading: false }
    default:
      return state
  }
}

export default current