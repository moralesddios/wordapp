import { AsyncStorage } from 'react-native'
import { call, put, takeLatest, all } from 'redux-saga/effects'
import { listVerseSuccess, listVerseError } from './actions'

import { VERSE_LIST_FETCH } from '../../constants/action-types'
import { executeSql } from '../../database'

const fetchVerseListAsync = async payload => {
  try {
    let tname = await AsyncStorage.getItem('TABLENAME')
    if(tname === null) tname = 'verses'
    const response = await executeSql(`SELECT * FROM ${tname} WHERE book_number = ? AND chapter = ? ORDER BY verse;`, payload)
    return { success: true, data: response }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}

function* fetchVerseList({ payload }) {
  const r = yield call(fetchVerseListAsync, payload)
  if (r.success) {
    yield put(listVerseSuccess({ data: r.data }))
  } else {
    yield put(listVerseError({ error: 'error' }))
  }
}

function* actionWatcher() {
  yield takeLatest(VERSE_LIST_FETCH, fetchVerseList)
}

export default function* verseSagas() {
  yield all([
    actionWatcher(),
  ])
}