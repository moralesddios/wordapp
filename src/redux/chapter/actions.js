import {
  CHAPTER_LIST_FETCH,
  CHAPTER_LIST_SUCCESS,
  CHAPTER_LIST_ERROR
} from '../../constants/action-types'

export const fetchChapterList = params => ({
  type: CHAPTER_LIST_FETCH,
  payload: params
})

export const listChapterSuccess = data => ({
  type: CHAPTER_LIST_SUCCESS,
  payload: data
})

export const listChapterError = error => ({
  type: CHAPTER_LIST_ERROR,
  payload: error
})