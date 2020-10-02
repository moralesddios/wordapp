import React, { useState } from 'react'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'

import store from './src/redux/store'
import Index from './src/navigation/index'
import { Prueba } from './src/components'

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

const fetchDatabase = async () => {
  return FileSystem.downloadAsync(
    Asset.fromModule(require('./assets/db.db')).uri,
    `${FileSystem.documentDirectory}SQLite/db.db`
  )
}

export default function App() {
  const colorScheme = useColorScheme()
  const [dataLoaded, setDataLoaded] = useState(false)

  if(!dataLoaded){
    return (
      <AppLoading
        startAsync={fetchDatabase}
        onFinish={() => setDataLoaded(true)}
        autoHideSplash={true}
      />
    )
  }

  return (
    <AppearanceProvider>
      <NavigationContainer>
        <Provider store={store}>
          <PaperProvider settings={{ icon: props => <Ionicons {...props} /> }} theme={colorScheme === 'dark' ? darkTheme : theme}>
            <Index />
          </PaperProvider>
        </Provider>
      </NavigationContainer>
    </AppearanceProvider>
  )
}
