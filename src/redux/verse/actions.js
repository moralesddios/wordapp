import {
  VERSE_LIST_FETCH,
  VERSE_LIST_SUCCESS,
  VERSE_LIST_ERROR
} from '../../constants/action-types'

export const fetchVerseList = params => ({
  type: VERSE_LIST_FETCH,
  payload: params
})

export const listVerseSuccess = data => ({
  type: VERSE_LIST_SUCCESS,
  payload: data
})

export const listVerseError = error => ({
  type: VERSE_LIST_ERROR,
  payload: error
})