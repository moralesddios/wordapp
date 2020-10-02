import React, { useRef, useCallback, useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { Surface, Button } from 'react-native-paper'

import * as Actions from '../redux/actions'
import { Verse, Tracker, SearchModal } from '../components'

function Bible({ setBook, setChapter, setModalVisible, fetchCurrent, fetchVerseList }) {
  const listRef = useRef()
  const { book, chapter, modal } = useSelector(state => state.app)
  const { total } = useSelector(state => state.current)
  const { data } = useSelector(state => state.verse)

  const renderVerse = useCallback(({ item }) => <Verse item={item} />, [])
  const keyExtractor = useCallback(item => item.verse.toString(), [])

  useEffect(() => {
    fetchCurrent([book])
    fetchVerseList([book, chapter])
  }, [])

  const scrollToTop = () => {
    listRef && listRef.current && listRef.current.scrollToOffset({ animated: false, offset: 0 })
  }

  const handlePrev = () => {
    setChapter(chapter - 1)
    fetchVerseList([book, chapter - 1])
    scrollToTop()
  }

  const handleNext = () => {
    setChapter(chapter + 1)
    fetchVerseList([book, chapter + 1])
    scrollToTop()
  }

  const handleNavigate = (book, chapter) => {
    setBook(book)
    setChapter(chapter)
    fetchCurrent([book])
    fetchVerseList([book, chapter])
    setModalVisible(false)
    scrollToTop()
  }

  const toggleSearchModal = () => {
    setModalVisible(!modal)
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
        />
      </SafeAreaView>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button icon="ios-arrow-back" onPress={handlePrev} disabled={chapter === 1} />
        <Tracker />
        <Button icon="ios-arrow-forward" onPress={handleNext} disabled={chapter === total} />
      </View>
      <SearchModal toggleSearchModal={toggleSearchModal} handleNavigate={handleNavigate} />
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
    paddingHorizontal: 15,
  }
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setBook: Actions.setBook,
    setChapter: Actions.setChapter,
    setModalVisible: Actions.setModalVisible,
    fetchCurrent: Actions.fetchCurrent,
    fetchVerseList: Actions.fetchVerseList,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Bible)