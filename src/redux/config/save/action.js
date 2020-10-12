import {
  CONFIG_SAVE_FETCH,
  CONFIG_SAVE_SUCCESS,
  CONFIG_SAVE_ERROR
} from '../../../constants/action-types'

export const fetchSaveConfig = (values, saved) => ({
  type: CONFIG_SAVE_FETCH,
  payload: values,
  saved: saved
})

export const successSaveConfig = () => ({
  type: CONFIG_SAVE_SUCCESS
})

export const errorSaveConfig = error => ({
  type: CONFIG_SAVE_ERROR,
  payload: error
})
