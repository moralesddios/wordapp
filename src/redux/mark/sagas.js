/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects'
import saveSagas from './save/saga'
import removeSagas from './remove/saga'

export default function* markSagas() {
  yield all([
    saveSagas(),
    removeSagas(),
  ])
}
