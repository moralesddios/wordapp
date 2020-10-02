import { call, put, takeLatest, all } from 'redux-saga/effects'
import { listChapterSuccess, listChapterError } from './actions'

import { CHAPTER_LIST_FETCH } from '../../constants/action-types'
import { executeSql } from '../../database'

const fetchVerseListAsync = async payload => {
  try {
    const response = await executeSql('SELECT DISTINCT(chapter) chapter FROM verses where book_number = ?;', payload)
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

function* fetchChapterList({ payload }) {
  const r = yield call(fetchVerseListAsync, payload)
  if (r.success) {
    yield put(listChapterSuccess({ data: r.data }))
  } else {
    yield put(listChapterError({ error: 'error' }))
  }
}

function* actionWatcher() {
  yield takeLatest(CHAPTER_LIST_FETCH, fetchChapterList)
}

export default function* chapterSagas() {
  yield all([
    actionWatcher(),
  ])
}