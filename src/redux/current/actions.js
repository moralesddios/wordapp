import {
  CURRENT_BOOK_FETCH,
  CURRENT_BOOK_SUCCESS,
  CURRENT_BOOK_ERROR
} from '../../constants/action-types'

export const fetchCurrent = params => ({
  type: CURRENT_BOOK_FETCH,
  payload: params
})

export const currentSuccess = data => ({
  type: CURRENT_BOOK_SUCCESS,
  payload: data
})

export const currentError = error => ({
  type: CURRENT_BOOK_ERROR,
  payload: error
})