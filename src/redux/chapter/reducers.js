import {
  CHAPTER_LIST_FETCH,
  CHAPTER_LIST_SUCCESS,
  CHAPTER_LIST_ERROR
} from '../../constants/action-types'

const INIT_STATE = {
  chapters: [],
  success: false,
  error: null,
  loading: false,
}

const chapter = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHAPTER_LIST_FETCH:
      return { ...state, error: null, loading: true }
    case CHAPTER_LIST_SUCCESS:
      return { ...state, chapters: action.payload.data, success: true, loading: false }
    case CHAPTER_LIST_ERROR:
      return { ...state, error: action.payload.error, loading: false }
    default:
      return state
  }
}

export default chapter