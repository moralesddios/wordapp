import React from 'react'
import { View } from 'react-native'
import { Slider } from 'react-native-elements'
import { useTheme } from 'react-native-paper'

export default function Tracker({ ...rest }) {
  const { colors } = useTheme()

  return (
    <View style={{ width: '100%', paddingHorizontal: 10 }}>
      <Slider
        {...rest}
        thumbTintColor={colors.primary}
        allowTouchTrack={true}
        maximumValue={30}
        minimumValue={16}
        step={1}
      />
    </View>
  )
}

