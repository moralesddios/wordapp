import {
  CONFIG_MOVE_FETCH,
  CONFIG_MOVE_SUCCESS,
  CONFIG_MOVE_ERROR
} from '../../../constants/action-types'

export const fetchSaveMove = values => ({
  type: CONFIG_MOVE_FETCH,
  payload: values
})

export const successSaveMove = () => ({
  type: CONFIG_MOVE_SUCCESS
})

export const errorSaveMove = error => ({
  type: CONFIG_MOVE_ERROR,
  payload: error
})
