import { call, put, takeLatest, all } from 'redux-saga/effects'
import { listBookSuccess, listBookError } from './actions'

import { BOOK_LIST_FETCH } from '../../constants/action-types'
import { executeSql } from '../../database'

const fetchBookListAsync = async () => {
  try {
    const response = await executeSql('SELECT * FROM books;')
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

function* fetchBookList() {
  const r = yield call(fetchBookListAsync)
  if (r.success) {
    yield put(listBookSuccess({ data: r.data }))
  } else {
    yield put(listBookError({ error: 'error' }))
  }
}

function* actionWatcher() {
  yield takeLatest(BOOK_LIST_FETCH, fetchBookList)
}

export default function* bookSagas() {
  yield all([
    actionWatcher(),
  ])
}