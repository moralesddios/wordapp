import {
  SET_BOOK,
  SET_CHAPTER,
  SET_VERSION,
  SET_THEME,
  SET_FONT_SIZE,
  SET_MODAL_VISIBLE
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

export function setModalVisible(payload) {
  return { type: SET_MODAL_VISIBLE, payload }
}