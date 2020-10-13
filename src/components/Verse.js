import React, { memo, useState, useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { Menu, Text, useTheme } from 'react-native-paper'
import { TouchableOpacity, AsyncStorage } from 'react-native'
import * as Speech from 'expo-speech'

import * as Actions from '../redux/actions'
import { executeSql } from '../database'
const regex = /<(?:.|\n)*?>/gm

function Verse({ item, fetchSaveMark, fetchRemoveMark }) {
  const { colors, dark } = useTheme()
  const [marked, setMarked] = useState(false)
  const [markId, setMarkId] = useState(0)
  const [visible, setVisible] = useState(false)
  const { book, chapter, fontSize } = useSelector(state => state.app)

  useEffect(() => {
    fetchMark([book, chapter, item.verse])
  }, [item])

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const speechText = () => {
    Speech.stop()
    Speech.speak(item.text)
    setVisible(false)
  }

  const markSaved = () => {
    setMarked(true)
    setVisible(false)
  }

  const setMark = mark => {
    setMarkId(mark.id)
    setMarked(true)
  }

  const removeSaved = () => {
    setMarked(false)
    setVisible(false)
  }

  const mark = async() => {
    fetchSaveMark([book, chapter, item.verse], markSaved)
  }

  const unmark = async() => {
    fetchRemoveMark([markId], removeSaved)
  }

  const fetchMark = async params => {
    setMarked(false)
    try {
      const r = await executeSql('SELECT * FROM marks WHERE book_number = ? AND chapter = ? AND verse = ?;', params)
      if (r.length > 0){
        setMark(r[0])
      }
    } catch (e) {
      return { success: false }
    }
  }

  if(item.text === '') return null

  let markColor = '#ffffff00'
  if(marked) markColor = colors.accent

  let textColor = colors.text
  if(marked) textColor = '#efefef'

  let marginLeft = 0
  let minHeight = 10
  if(item.verse === 1) {
    minHeight = 55
    marginLeft = chapter > 9 ? 70 : 45
  }

  return (
    <React.Fragment>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu} style={{ padding: 2 }}>
            <Text style={{ color: textColor, backgroundColor: markColor, fontSize: fontSize, textAlign: 'justify', minHeight: minHeight, marginLeft: marginLeft }}>
              <Text style={{ color: colors.primary, fontSize: fontSize + 2, fontWeight: 'bold' }}>{`${item.verse} `}</Text>
              {item.text.replace(regex, '')}
            </Text>
          </TouchableOpacity>
        }>
        <Menu.Item onPress={() => speechText()} title="Escuchar" icon="ios-play" />
        {marked && <Menu.Item onPress={() => unmark()} title="Desmarcar" icon="ios-bookmark" />}
        {!marked && <Menu.Item onPress={() => mark()} title="Marcar" icon="ios-bookmark" />}
      </Menu>
      {item.verse === 1 && <Text style={{position: 'absolute', left: 0, top: -5, color: colors.accent, fontSize: 60}}>{chapter}</Text>}
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchSaveMark: Actions.fetchSaveMark,
    fetchRemoveMark: Actions.fetchRemoveMark,
  }, dispatch);
}

export default compose(
  memo,
  connect(null, mapDispatchToProps),
)(Verse)
