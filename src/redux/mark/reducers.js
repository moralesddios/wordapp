import { combineReducers } from 'redux'
import save from './save/reducer'
import remove from './remove/reducer'

const mark = combineReducers({
  save,
  remove,
})

export default mark
