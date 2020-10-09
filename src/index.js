import React, { useState, useEffect } from 'react'
import { Title, Surface } from 'react-native-paper'
import * as FileSystem from 'expo-file-system'

import { Main } from './navigation'

export default function Initial() {
  const [loaded, setLoaded] = useState(false)

  const dataload = async () => {
    // await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite/db.db`, { idempotent: true })

    const r = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}SQLite`)
    // console.log(r)

    if(r.includes('db.db')){
      setLoaded(true)
    } else {
      // console.log('iniciando descarga...')
      await FileSystem.downloadAsync(
        'https://www.dropbox.com/s/m7sjkidsdwunq99/db.db?dl=1',
        `${FileSystem.documentDirectory}SQLite/db.db`
      )
      setLoaded(true)
      // console.log('descarga finalizada...')
    }
  }

  useEffect(() => {
    dataload()
  }, [])

  if (loaded) return (<Main />)

  return (
    <Surface style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1c7ce0'}}>
      <Title style={{ color: 'white' }}>Descargando datos...</Title>
    </Surface>
  )
}

