import React, { useRef, useCallback, useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, SafeAreaView, FlatList, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { Surface, Button, useTheme } from 'react-native-paper'
import { UIActivityIndicator } from 'react-native-indicators'
import Icon from 'react-native-vector-icons/FontAwesome5'

import * as Actions from '../redux/actions'
import { Verse } from '../components'

function Bible({ setChapter, fetchCurrent, fetchVerseList, fetchSaveMove }) {
  const listRef = useRef()
  const { book, chapter, version } = useSelector(state => state.app)
  const { total } = useSelector(state => state.current)
  const { loading, data } = useSelector(state => state.verse)
  const { colors } = useTheme()

  const renderVerse = useCallback(({ item }) => <Verse item={item} />, [])
  const keyExtractor = useCallback(item => item.verse.toString(), [])

  useEffect(() => {
    fetchCurrent([book])
    fetchVerseList(version, [book, chapter])
  }, [])

  const scrollToTop = () => {
    listRef && listRef.current && listRef.current.scrollToOffset({ animated: false, offset: 0 })
  }

  const handlePrev = () => {
    fetchSaveMove([book, chapter-1])
    setChapter(chapter - 1)
    fetchVerseList(version, [book, chapter - 1])
    scrollToTop()
  }

  const handleNext = () => {
    fetchSaveMove([book, chapter+1])
    setChapter(chapter + 1)
    fetchVerseList(version, [book, chapter + 1])
    scrollToTop()
  }

  return (
    <Surface style={styles.container}>
      <SafeAreaView style={styles.list}>
      {loading ? <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}><UIActivityIndicator color={colors.primary} /></View> :
        <FlatList
          ref={listRef}
          data={data}
          renderItem={renderVerse}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          style={{ marginHorizontal: 15 }}
        />}
      </SafeAreaView>
      <View style={styles.toolbar}>
        <TouchableNativeFeedback onPress={handlePrev} disabled={chapter === 1}>
          <View style={styles.button}>
            <Icon name="chevron-left" size={36} color={chapter === 1 ? colors.disabled : colors.primary} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={handleNext} disabled={chapter === total}>
          <View style={styles.button}>
            <Icon name="chevron-right" size={36} color={chapter === total ? colors.disabled : colors.primary} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#FFFFFF00',
    paddingVertical: 6,
    paddingHorizontal: 10
  }
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setChapter: Actions.setChapter,
    setModalVisible: Actions.setModalVisible,
    fetchCurrent: Actions.fetchCurrent,
    fetchVerseList: Actions.fetchVerseList,
    fetchSaveMove: Actions.fetchSaveMove,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Bible)