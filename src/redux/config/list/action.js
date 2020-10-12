import {
  CONFIG_LIST_FETCH,
  CONFIG_LIST_SUCCESS,
  CONFIG_LIST_ERROR
} from '../../../constants/action-types'

export const fetchConfig = setInitial => ({
  type: CONFIG_LIST_FETCH,
  setInitial: setInitial
})

export const successConfig = data => ({
  type: CONFIG_LIST_SUCCESS,
  payload: data
})

export const errorConfig = error => ({
  type: CONFIG_LIST_ERROR,
  payload: error
})
