import { combineReducers } from 'redux'
import app from './app/reducers'
import book from './book/reducers'
import verse from './verse/reducers'
import chapter from './chapter/reducers'
import current from './current/reducers'

const reducers = combineReducers({
  app,
  book,
  verse,
  chapter,
  current,
})

export default reducers
