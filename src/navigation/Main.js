import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { Header } from '../components'
import { Bible, Config } from '../scenes'

const Stack = createStackNavigator()

export default function Main() {
  return (
    <Stack.Navigator
      headerMode="screen"
      mode="modal"
      screenOptions={{
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
    >
      <Stack.Screen name="bible" component={Bible} options={{ ...TransitionPresets.SlideFromRightIOS, title: '' }} />
      <Stack.Screen name="config" component={Config} options={{ ...TransitionPresets.SlideFromRightIOS, title: 'Configuración' }} />
    </Stack.Navigator>
  )
}
