import { call, put, takeLatest, all } from 'redux-saga/effects'
import { listBookSuccess, listBookError } from './actions'

import { BOOK_LIST_FETCH } from '../../constants/action-types'
import { executeSql } from '../../database'

const fetchBookListAsync = async search => {
  try {
    let response
    if(search===''){
      response = await executeSql('SELECT * FROM books;')
    } else {
      response = await executeSql(`SELECT * FROM books WHERE replace(replace(replace(replace(replace(replace(replace(replace(
        replace(replace(replace( lower(long_name), 'á','a'), 'ã','a'), 'â','a'), 'é','e'), 'ê','e'), 'í','i'),
        'ó','o') ,'õ','o') ,'ô','o'),'ú','u'), 'ç','c') LIKE '%${search}%';`)
    }
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

const fetchTestamentListAsync = async testament => {
  try {
    let response
    if(testament==='old'){
      response = await executeSql('SELECT * FROM books WHERE book_number < 470;')
    } else {
      response = await executeSql('SELECT * FROM books WHERE book_number > 460;')
    }
    return { success: true, data: response }
  } catch (e) {
    return { success: false }
  }
}

function* fetchBookList({ testament, search }) {
  const r = testament ? yield call(fetchTestamentListAsync, testament) : yield call(fetchBookListAsync, search)
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