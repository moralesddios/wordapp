import React, { memo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Menu, Text, useTheme } from 'react-native-paper'
import { TouchableOpacity, AsyncStorage } from 'react-native'
import * as Speech from 'expo-speech'

const regex = /<(?:.|\n)*?>/gm

function Verse({ item }) {
  const { colors, dark } = useTheme()
  const [marked, setMarked] = useState(false)
  const [visible, setVisible] = useState(false)
  const { book, chapter, fontSize } = useSelector(state => state.app)

  useEffect(() => {
    fetchMarks = async() => {
      let array = []
      setMarked(false)
      const marks = await AsyncStorage.getItem('MARKS')
      if(marks !== null) array = JSON.parse(marks)
      if (array.includes(`${book}.${chapter}.${item.verse}`)) setMarked(true)
    }

    fetchMarks()
  }, [item])

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const speechText = () => {
    Speech.stop()
    Speech.speak(item.text)
    setVisible(false)
  }

  const mark = async() => {
    let array = []
    const marks = await AsyncStorage.getItem('MARKS')
    if (marks !== null) array = JSON.parse(marks)
    array.push(`${book}.${chapter}.${item.verse}`)
    AsyncStorage.setItem('MARKS', JSON.stringify(array))
    setMarked(true)
    setVisible(false)
  }

  const unmark = async() => {
    let array = []
    const marks = await AsyncStorage.getItem('MARKS')
    if(marks !== null) array = JSON.parse(marks)
    const i = array.findIndex(e => e === `${book}.${chapter}.${item.verse}`)
    if (i !== -1) array.splice(i, 1)
    AsyncStorage.setItem('MARKS', JSON.stringify(array))
    setMarked(false)
    setVisible(false)
  }

  const getColor = () => {
    if(dark && marked) return colors.accent
    if(marked) return '#ccff00'
    return '#ffffff00'
  }

  if(item.text === '') return null

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu} style={{ padding: 2 }}>
          <Text style={{ color: colors.text, backgroundColor: getColor(), fontSize: fontSize, textAlign: 'justify' }}>
            <Text style={{ color: colors.primary, fontSize: fontSize + 2, fontWeight: 'bold' }}>{`${item.verse} `}</Text>
            {item.text.replace(regex, '')}
          </Text>
        </TouchableOpacity>
      }>
      <Menu.Item onPress={() => speechText()} title="Escuchar" icon="ios-play" />
      {marked && <Menu.Item onPress={() => unmark()} title="Desmarcar" icon="ios-bookmark" />}
      {!marked && <Menu.Item onPress={() => mark()} title="Marcar" icon="ios-bookmark" />}
    </Menu>
  )
}

export default memo(Verse)
