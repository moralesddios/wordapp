import { call, put, takeLatest, all } from 'redux-saga/effects'
import { successSaveConfig, errorSaveConfig } from './action'

import { CONFIG_SAVE_FETCH } from '../../../constants/action-types'
import { createSql } from '../../../database'

const insertAsync = async params => {
  try {
    const response = await createSql('INSERT INTO config (version, fontsize) VALUES (?, ?);', params)
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

const updateAsync = async params => {
  try {
    const response = await createSql('UPDATE config SET version=?, fontsize=? WHERE id = ?;', params)
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

function* fetchSaveConfig({ payload, saved }) {
  const { id, version, fontsize } = payload
  const params = [version, fontsize, id]
  const { success } = id ? yield call(updateAsync, params) : yield call(insertAsync, params)
  if (success) {
    yield put(successSaveConfig())
    saved(payload)
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