import { call, put, takeLatest, all } from 'redux-saga/effects'
import { successSaveMove, errorSaveMove } from './action'

import { CONFIG_MOVE_FETCH } from '../../../constants/action-types'
import { createSql } from '../../../database'

const saveAsync = async params => {
  try {
    const response = await createSql('UPDATE config SET book_number=?, chapter=? WHERE id = 1;', params)
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

function* fetchSaveMove({ payload }) {
  const { success } = yield call(saveAsync, payload)
  if (success) {
    yield put(successSaveMove())
  } else {
    yield put(errorSaveMove({error: 'error'}))
  }
}

function* actionWatcher() {
  yield takeLatest(CONFIG_MOVE_FETCH, fetchSaveMove)
}

export default function* saveSagas() {
  yield all([
    actionWatcher(),
  ])
}