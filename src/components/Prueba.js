import React, { Component } from 'react'
import { Title, Surface } from 'react-native-paper'
import * as FileSystem from 'expo-file-system'
import * as SQLite from 'expo-sqlite'

export default class Prueba extends Component {

  async componentDidMount(){
    FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite/tla.db`, { idempotent: true })

    const r = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}SQLite`)
    console.log(r)

    const db = SQLite.openDatabase("db.db");

    db.transaction(tx => {
      tx.executeSql(
        `select * from averses where book_number = 10 AND chapter = 1;`,
        [],
        (_, { rows: { _array } }) => console.log(_array)
      )
    })
  }

  render() {
    return (
      <Surface style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <Title>Pruebas</Title>
      </Surface>
    )
  }
}
