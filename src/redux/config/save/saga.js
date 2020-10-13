import { call, put, takeLatest, all } from 'redux-saga/effects'
import { successSaveConfig, errorSaveConfig } from './action'

import { CONFIG_SAVE_FETCH } from '../../../constants/action-types'
import { createSql, executeSql } from '../../../database'

const saveAsync = async params => {
  try {
    const r = await executeSql('SELECT * from config WHERE id = 1;')
    if(r.length > 0){
      const response = await createSql('UPDATE config SET version=?, theme=?, fontsize=? WHERE id = 1;', params)
    } else {
      const response = await createSql('INSERT INTO config (version, theme, fontsize) VALUES (?, ?, ?);', params)
    }
    return { success: true }
  } catch (e) {
    return { success: false }
  }
}

function* fetchSaveConfig({ payload, saved }) {
  const { success } = yield call(saveAsync, payload)
  if (success) {
    yield put(successSaveConfig())
    saved({ version: payload[0], theme: payload[1], fontsize: payload[2] })
  } else {
    yield put(errorSaveConfig({error: 'error'}))
  }
}

function* actionWatcher() {
  yield takeLatest(CONFIG_SAVE_FETCH, fetchSaveConfig)
}

export default function* saveSagas() {
  yield all([
    actionWatcher(),
  ])
}