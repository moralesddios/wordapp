import { combineReducers } from 'redux'
import save from './save/reducer'
import remove from './remove/reducer'
import list from './list/reducer'

const mark = combineReducers({
  save,
  remove,
  list,
})

export default mark
