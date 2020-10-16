import React from 'react'
import { useColorScheme } from 'react-native-appearance'
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Main } from './navigation'

const lightTheme = {
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

export default function Paper() {
  const { theme } = useSelector(state => state.app)
  const colorScheme = useColorScheme()

  let tm = colorScheme === 'dark' ? darkTheme : lightTheme
  switch(theme){
    case 'light':
      tm = lightTheme
      break
    case 'purple':
      tm = purpleTheme
      break
    case 'dark':
      tm = darkTheme
      break
    default:
      //
  }

  return (
    <PaperProvider settings={{ icon: props => <Ionicons {...props} /> }} theme={tm}>
      <Main />
    </PaperProvider>
  )
}
