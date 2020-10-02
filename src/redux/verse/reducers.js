import {
  VERSE_LIST_FETCH,
  VERSE_LIST_SUCCESS,
  VERSE_LIST_ERROR
} from '../../constants/action-types'

const INIT_STATE = {
  data: [],
  success: false,
  error: null,
  loading: false,
}

const verse = (state = INIT_STATE, action) => {
  switch (action.type) {
    case VERSE_LIST_FETCH:
      return { ...state, error: null, loading: true }
    case VERSE_LIST_SUCCESS:
      return { ...state, data: action.payload.data, success: true, loading: false }
    case VERSE_LIST_ERROR:
      return { ...state, error: action.payload.error, loading: false }
    default:
      return state
  }
}

export default verse