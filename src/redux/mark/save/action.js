import {
  MARK_SAVE_FETCH,
  MARK_SAVE_SUCCESS,
  MARK_SAVE_ERROR
} from '../../../constants/action-types'

export const fetchSaveMark = (values, markSaved) => ({
  type: MARK_SAVE_FETCH,
  payload: values,
  markSaved: markSaved
})

export const successSaveMark = () => ({
  type: MARK_SAVE_SUCCESS
})

export const errorSaveMark = error => ({
  type: MARK_SAVE_ERROR,
  payload: error
})
