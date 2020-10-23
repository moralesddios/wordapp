import React, { memo, useState, useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { Menu, useTheme } from 'react-native-paper'
import { TouchableOpacity, View, Text } from 'react-native'
import * as Speech from 'expo-speech'
import i18n from 'i18n-js'

import * as Actions from '../redux/actions'
import { executeSql } from '../database'
const regex = /\[(?:.|\n)*?\]/gm
const regex2 = /<(?:.|\n)*?>/gm

function Verse({ item, fetchSaveMark, fetchRemoveMark }) {
  const { colors } = useTheme()
  const [title, setTitle] = useState(null)
  const [marked, setMarked] = useState(false)
  const [markId, setMarkId] = useState(0)
  const [visible, setVisible] = useState(false)
  const { book, chapter, fontSize } = useSelector(state => state.app)

  useEffect(() => {
    fetchStory([book, chapter, item.verse])
    fetchMark([book, chapter, item.verse])
  }, [item])

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const speechText = () => {
    Speech.stop()
    Speech.speak(item.text.replace(regex, '').replace(regex2, ''))
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

  const fetchStory = async params => {
    setTitle(null)
    try {
      const r = await executeSql('SELECT title FROM stories WHERE book_number = ? AND chapter = ? AND verse = ?;', params)
      if (r.length > 0){
        setTitle(r[0].title)
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

  return (
    <React.Fragment>
      {title && <Text style={{ color: colors.primary, fontSize: fontSize, fontWeight: 'bold', textAlign: 'center', marginTop: 10, marginBottom: 5 }}>
        {title}
      </Text>}
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu} style={{ padding: 2, flexDirection: 'row' }}>
            {item.verse === 1 && <View style={{paddingRight: 10, height: 60}}><Text style={{color: colors.accent, fontSize: 42}}>{chapter}</Text></View>}
            <Text style={{ color: textColor, backgroundColor: markColor, fontSize: fontSize, textAlign: 'justify', flexShrink: 1 }}>
              <Text style={{ color: colors.primary, fontSize: fontSize + 2, fontWeight: 'bold' }}>{`${item.verse} `}</Text>
              {item.text.replace(regex, '').replace(regex2, '')}
            </Text>
          </TouchableOpacity>
        }>
        <Menu.Item onPress={() => speechText()} title={i18n.t('listen')} icon="ios-play" />
        {marked && <Menu.Item onPress={() => unmark()} title={i18n.t('unmark')} icon="ios-bookmark" />}
        {!marked && <Menu.Item onPress={() => mark()} title={i18n.t('mark')} icon="ios-bookmark" />}
      </Menu>
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
