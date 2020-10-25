import {
  MARK_LIST_FETCH,
  MARK_LIST_SUCCESS,
  MARK_LIST_ERROR
} from '../../../constants/action-types'

export const fetchMarks = () => ({
  type: MARK_LIST_FETCH
})

export const successMarks = data => ({
  type: MARK_LIST_SUCCESS,
  payload: data
})

export const errorMarks = error => ({
  type: MARK_LIST_ERROR,
  payload: error
})
