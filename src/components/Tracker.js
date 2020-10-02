import React, { useEffect } from 'react'
import { View, AsyncStorage } from 'react-native'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { Slider } from 'react-native-elements'
import { useTheme } from 'react-native-paper'

import * as Actions from '../redux/actions'

function Tracker({ setFontSize }) {
  const { fontSize } = useSelector(state => state.app)
  const { colors } = useTheme()

  useEffect(() => {
    fetchValue()
  }, [])

  fetchValue = async() => {
    let fsize = await AsyncStorage.getItem('FONTSIZE')
    if(fsize === null) fsize = '16'
    fsize = parseInt(fsize)
    setFontSize(fsize)
  }

  const handleChange = value => {
    setFontSize(value)
    AsyncStorage.setItem('FONTSIZE', value.toString())
  }

  return (
    <View style={{ flex: 1 }}>
      <Slider
        value={fontSize}
        onValueChange={handleChange}
        thumbTintColor={colors.primary}
        allowTouchTrack={true}
        maximumValue={30}
        minimumValue={16}
        step={1}
      />
    </View>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setFontSize: Actions.setFontSize,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Tracker)

