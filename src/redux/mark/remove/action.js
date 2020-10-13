import {
  REMOVE_MARK_FETCH,
  REMOVE_MARK_SUCCESS,
  REMOVE_MARK_ERROR
} from '../../../constants/action-types'

export const fetchRemoveMark = (payload, removeSaved) => ({
  type: REMOVE_MARK_FETCH,
  payload: payload,
  removeSaved: removeSaved
})

export const successRemoveMark = () => ({
  type: REMOVE_MARK_SUCCESS
})

export const errorRemoveMark = error => ({
  type: REMOVE_MARK_ERROR,
  payload: error
})
