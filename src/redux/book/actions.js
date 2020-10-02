import {
  BOOK_LIST_FETCH,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_ERROR
} from '../../constants/action-types'

export const fetchBookList = () => ({
  type: BOOK_LIST_FETCH
})

export const listBookSuccess = data => ({
  type: BOOK_LIST_SUCCESS,
  payload: data
})

export const listBookError = error => ({
  type: BOOK_LIST_ERROR,
  payload: error
})