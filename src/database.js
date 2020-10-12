import * as SQLite from 'expo-sqlite'

export async function executeSql(sql, params = []){
  const database = SQLite.openDatabase('bilbe.db')
  return new Promise((resolve, reject) => database.transaction(tx => {
    tx.executeSql(sql, params, (_, { rows }) => resolve(rows._array), reject)
  }))
}

export async function createSql(sql, params = []){
  const database = SQLite.openDatabase('bilbe.db')
  return new Promise((resolve, reject) => database.transaction(tx => {
    tx.executeSql(sql, params, (_, resp) => resolve(resp), reject)
  }))
}