import { combineReducers } from 'redux'
import app from './app/reducers'
import book from './book/reducers'
import verse from './verse/reducers'
import chapter from './chapter/reducers'
import current from './current/reducers'
import config from './config/reducers'

const reducers = combineReducers({
  app,
  book,
  verse,
  chapter,
  current,
  config,
})

export default reducers
