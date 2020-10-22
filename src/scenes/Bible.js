import React, { useRef, useCallback, useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { Surface, Button } from 'react-native-paper'

import * as Actions from '../redux/actions'
import { Verse } from '../components'

function Bible({ setChapter, fetchCurrent, fetchVerseList, fetchSaveMove }) {
  const listRef = useRef()
  const { book, chapter, version } = useSelector(state => state.app)
  const { total } = useSelector(state => state.current)
  const { data } = useSelector(state => state.verse)

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
        <FlatList
          ref={listRef}
          data={data}
          renderItem={renderVerse}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          style={{ marginHorizontal: 15 }}
        />
      </SafeAreaView>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 }}>
        <Button icon="ios-arrow-back" onPress={handlePrev} disabled={chapter === 1} />
        <Button icon="ios-arrow-forward" onPress={handleNext} disabled={chapter === total} />
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