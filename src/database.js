import * as SQLite from 'expo-sqlite'

export async function executeSql(sql, params = []){
  const database = SQLite.openDatabase('db.db')
  return new Promise((resolve, reject) => database.transaction(tx => {
    tx.executeSql(sql, params, (_, { rows }) => resolve(rows._array), reject)
  }))
}