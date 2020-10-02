import { call, put, takeLatest, all } from 'redux-saga/effects'
import { currentSuccess, currentError } from './actions'

import { CURRENT_BOOK_FETCH } from '../../constants/action-types'
import { executeSql } from '../../database'

const fetchCurrentAsync = async payload => {
  try {
    const response = await executeSql('SELECT b.long_name name, MAX(v.chapter) total FROM verses v JOIN books b ON b.book_number = v.book_number WHERE v.book_number = ?;', payload)
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

function* fetchCurrent({ payload }) {
  const r = yield call(fetchCurrentAsync, payload)
  if (r.success) {
    yield put(currentSuccess({ bookname: r.data[0].name, total: r.data[0].total }))
  } else {
    yield put(currentError({ error: 'error' }))
  }
}

function* actionWatcher() {
  yield takeLatest(CURRENT_BOOK_FETCH, fetchCurrent)
}

export default function* currentSagas() {
  yield all([
    actionWatcher(),
  ])
}