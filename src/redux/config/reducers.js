import { combineReducers } from 'redux'
import list from './list/reducer'
import save from './save/reducer'
import move from './move/reducer'

const config = combineReducers({
  list,
  save,
  move,
})

export default config
