import { call, put, takeLatest, all } from 'redux-saga/effects'
import { successConfig, errorConfig } from './action'

import { CONFIG_LIST_FETCH } from '../../../constants/action-types'
import { executeSql } from '../../../database'

const getConfigAsync = async() => {
  try {
    const response = await executeSql('SELECT * FROM config where id = 1;')
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

function* fetchConfig({ setInitial }) {
  const { success, data } = yield call(getConfigAsync)
  if (success) {
    const d = data[0]
    setInitial({ id: d.id, fontsize: d.fontsize, version: d.version })
    yield put(successConfig({data: d}))
  } else {
    yield put(errorConfig({error: 'error'}))
  }
}

function* actionWatcher() {
  yield takeLatest(CONFIG_LIST_FETCH, fetchConfig)
}

export default function* saveSagas() {
  yield all([
    actionWatcher(),
  ])
}