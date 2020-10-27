import {
  SET_BOOK,
  SET_CHAPTER,
  SET_VERSION,
  SET_THEME,
  SET_FONT_SIZE,
  SET_AVATAR_URL
} from '../../constants/action-types'

export function setBook(payload) {
  return { type: SET_BOOK, payload }
}

export function setChapter(payload) {
  return { type: SET_CHAPTER, payload }
}

export function setVersion(payload) {
  return { type: SET_VERSION, payload }
}

export function setTheme(payload) {
  return { type: SET_THEME, payload }
}

export function setFontSize(payload) {
  return { type: SET_FONT_SIZE, payload }
}

export function setAvatarUrl(payload) {
  return { type: SET_AVATAR_URL, payload }
}