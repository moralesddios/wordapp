import {
  SET_BOOK,
  SET_CHAPTER,
  SET_FONT_SIZE,
  SET_MODAL_VISIBLE
} from '../../constants/action-types'

const initialState = {
  book: 10,
  chapter: 1,
  fontSize: 16,
  modal: false,
}

function app(state = initialState, action) {
  switch (action.type) {
    case SET_BOOK:
      return { ...state, book: action.payload }
    case SET_CHAPTER:
      return { ...state, chapter: action.payload }
    case SET_FONT_SIZE:
      return { ...state, fontSize: action.payload }
    case SET_MODAL_VISIBLE:
      return { ...state, modal: action.payload }
    default:
      return state
  }
}

export default app