import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import i18n from 'i18n-js'

import { Header } from '../components'
import { Start, Bible, Search, OldList, NewList, Bookmarks, Config } from '../scenes'

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
      <Stack.Screen name="start" component={Start} options={{ ...TransitionPresets.SlideFromRightIOS, title: 'WordApp' }} />
      <Stack.Screen name="search" component={Search} options={{ ...TransitionPresets.SlideFromRightIOS, title: i18n.t('search') }} />
      <Stack.Screen name="old" component={OldList} options={{ ...TransitionPresets.SlideFromRightIOS, title: i18n.t('old') }} />
      <Stack.Screen name="new" component={NewList} options={{ ...TransitionPresets.SlideFromRightIOS, title: i18n.t('new') }} />
      <Stack.Screen name="bible" component={Bible} options={{ ...TransitionPresets.SlideFromRightIOS, title: '' }} />
      <Stack.Screen name="bookmarks" component={Bookmarks} options={{ ...TransitionPresets.SlideFromRightIOS, title: i18n.t('bookmarks') }} />
      <Stack.Screen name="config" component={Config} options={{ ...TransitionPresets.SlideFromRightIOS, title: i18n.t('settings') }} />
    </Stack.Navigator>
  )
}
