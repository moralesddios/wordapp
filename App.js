import React, { useState } from 'react'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as FileSystem from 'expo-file-system'

import { createSql, executeSql } from './src/database'
import store from './src/redux/store'
import Index from './src/index'

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0B3C5D',
    accent: '#328CC1',
    text: '#1D2731'
  },
}

const purpleTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6a1b9a',
    accent: '#ec407a',
    text: '#1D2731'
  },
}

const darkTheme = {
  ...DarkTheme,
  dark: true,
  mode: 'adaptive',
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    primary: '#0B3C5D',
    accent: '#328CC1',
    text: '#DFDFE3'
  },
}

export default function App() {
  const colorScheme = useColorScheme()
  const [dataLoaded, setDataLoaded] = useState(false)
  const [exists, setExists] = useState(false)
  const [initials, setInitials] = useState({})

  const loadInitials = async () => {
    const r = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}`)
    if (!r.includes('SQLite')){
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`)
    }
    const s = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}SQLite`)
    if(s.includes('bilbe.db')){
      setExists(true)
      try {
        await createSql('create table if not exists config (id integer primary key not null, book_number smallint, chapter smallint, version varchar(10), fontsize tinyint, theme varchar(12));')
        await createSql('create table if not exists marks (id integer primary key not null, book_number smallint, chapter smallint, verse smallint, color varchar(10));')
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

  let tm = colorScheme === 'dark' ? darkTheme : theme
  if(initials && initials.id){
    switch(initials.theme){
      case 'light':
        tm = theme
        break
      case 'purple':
        tm = purpleTheme
        break
      case 'dark':
        tm = darkTheme
        break
      default:
        //code
    }
  }

  return (
    <AppearanceProvider>
      <NavigationContainer>
        <Provider store={store}>
          <PaperProvider settings={{ icon: props => <Ionicons {...props} /> }} theme={tm}>
            <Index exists={exists} initials={initials} />
          </PaperProvider>
        </Provider>
      </NavigationContainer>
    </AppearanceProvider>
  )
}
