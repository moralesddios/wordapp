import { call, put, takeLatest, all } from 'redux-saga/effects'
import { successRemoveMark, errorRemoveMark } from './action'

import { REMOVE_MARK_FETCH } from '../../../constants/action-types'
import { createSql } from '../../../database'

const removeAsync = async params => {
  try {
    const response = await createSql('DELETE FROM marks WHERE id = ?;', params)
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

function* fetchRemoveMark({ payload, removeSaved }) {
  const { success } = yield call(removeAsync, payload)
  if (success) {
    yield put(successRemoveMark())
    removeSaved()
  } else {
    yield put(errorRemoveMark({error: 'error'}))
  }
}

function* actionWatcher() {
  yield takeLatest(REMOVE_MARK_FETCH, fetchRemoveMark)
}

export default function* removeSagas() {
  yield all([
    actionWatcher(),
  ])
}