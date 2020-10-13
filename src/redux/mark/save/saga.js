import { call, put, takeLatest, all } from 'redux-saga/effects'
import { successSaveMark, errorSaveMark } from './action'

import { MARK_SAVE_FETCH } from '../../../constants/action-types'
import { createSql } from '../../../database'

const insertAsync = async params => {
  try {
    const response = await createSql('INSERT INTO marks (book_number, chapter, verse) VALUES (?, ?, ?);', params)
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

function* fetchSaveMark({ payload, markSaved }) {
  const { success } = yield call(insertAsync, payload)
  if (success) {
    yield put(successSaveMark())
    markSaved()
  } else {
    yield put(errorSaveMark({error: 'error'}))
  }
}

function* actionWatcher() {
  yield takeLatest(MARK_SAVE_FETCH, fetchSaveMark)
}

export default function* saveSagas() {
  yield all([
    actionWatcher(),
  ])
}