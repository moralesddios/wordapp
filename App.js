import React, { useState } from 'react'
import { AppearanceProvider } from 'react-native-appearance'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as FileSystem from 'expo-file-system'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import { createSql, executeSql } from './src/database'
import store from './src/redux/store'
import Index from './src/index'

i18n.translations = {
  en: require('./src/translations/en.json'),
  es: require('./src/translations/es.json'),
}

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [exists, setExists] = useState(false)
  const [initials, setInitials] = useState({})

  const loadInitials = async () => {
    const r = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}`)
    if (!r.includes('SQLite')){
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`)
    }
    if (!r.includes('wordapp')){
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}wordapp`)
    }
    const s = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}SQLite`)
    if(s.includes('bilbe.db')){
      setExists(true)
      try {
        await createSql('create table if not exists config (id integer primary key not null, book_number smallint, chapter smallint, version varchar(10), fontsize tinyint, theme varchar(12));')
        await createSql('create table if not exists marks (id integer primary key not null, book_number smallint, chapter smallint, verse smallint, color varchar(10));')
      } catch (e) {
        console.log(e)
      }
      try {
        await createSql('alter table config add avatar text;')
      } catch (e) {
        console.log(e)
      }
      try {
        const resp = await executeSql('SELECT * FROM config where id = 1;')
        if(resp.length > 0){
          const data = resp[0]
          setInitials(data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  if(!dataLoaded){
    return (
      <AppLoading
        startAsync={loadInitials}
        onFinish={() => setDataLoaded(true)}
        autoHideSplash={true}
      />
    )
  }

  return (
    <AppearanceProvider>
      <NavigationContainer>
        <Provider store={store}>
          <Index exists={exists} initials={initials} />
        </Provider>
      </NavigationContainer>
    </AppearanceProvider>
  )
}
