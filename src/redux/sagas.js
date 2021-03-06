/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects'
import bookSagas from './book/sagas'
import verseSagas from './verse/sagas'
import chapterSagas from './chapter/sagas'
import currentSagas from './current/sagas'
import configSagas from './config/sagas'
import markSagas from './mark/sagas'

export default function* rootSaga() {
  yield all([
    bookSagas(),
    verseSagas(),
    chapterSagas(),
    currentSagas(),
    configSagas(),
    markSagas(),
  ])
}
