/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects'
import listSagas from './list/saga'
import saveSagas from './save/saga'
import moveSagas from './move/saga'

export default function* configSagas(getState) {
  yield all([
    listSagas(),
    saveSagas(),
    moveSagas()
  ])
}
