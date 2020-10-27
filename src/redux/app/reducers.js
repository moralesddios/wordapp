import {
  SET_BOOK,
  SET_CHAPTER,
  SET_VERSION,
  SET_THEME,
  SET_FONT_SIZE,
  SET_AVATAR_URL
} from '../../constants/action-types'

const initialState = {
  book: 10,
  chapter: 1,
  version: 'verses',
  theme: 'automatic',
  fontSize: 16,
  avatar: '',
}

function app(state = initialState, action) {
  switch (action.type) {
    case SET_BOOK:
      return { ...state, book: action.payload }
    case SET_CHAPTER:
      return { ...state, chapter: action.payload }
    case SET_VERSION:
      return { ...state, version: action.payload }
    case SET_THEME:
      return { ...state, theme: action.payload }
    case SET_FONT_SIZE:
      return { ...state, fontSize: action.payload }
    case SET_AVATAR_URL:
      return { ...state, avatar: action.payload }
    default:
      return state
  }
}

export default app