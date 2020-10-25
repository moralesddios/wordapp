import { call, put, takeLatest, all } from 'redux-saga/effects'
import { successMarks, errorMarks } from './action'

import { MARK_LIST_FETCH } from '../../../constants/action-types'
import { executeSql } from '../../../database'

const getMarksAsync = async() => {
  try {
    const response = await executeSql('SELECT b.long_name, v.* FROM marks m JOIN books b ON b.book_number = m.book_number JOIN verses v ON v.verse = m.verse WHERE v.book_number = m.book_number AND v.chapter = m.chapter;')
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

function* fetchMarks() {
  const { success, data } = yield call(getMarksAsync)
  if (success) {
    yield put(successMarks({data: data}))
  } else {
    yield put(errorMarks({error: 'error'}))
  }
}

function* actionWatcher() {
  yield takeLatest(MARK_LIST_FETCH, fetchMarks)
}

export default function* saveSagas() {
  yield all([
    actionWatcher(),
  ])
}