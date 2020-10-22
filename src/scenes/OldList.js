import React, { useState, useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, ScrollView, FlatList } from 'react-native'
import { Surface, Title, Button, ActivityIndicator, useTheme } from 'react-native-paper'
import i18n from 'i18n-js'

import * as Actions from '../redux/actions'

function OldList({ navigation, setaBook, setChapter, fetchCurrent, fetchSaveMove, fetchVerseList, fetchBookList, fetchChapterList }) {
  const { data, loading } = useSelector(state => state.book)
  const { chapters } = useSelector(state => state.chapter)
  const { version } = useSelector(state => state.app)
  const [book, setBook] = useState(null)
  const { colors, dark } = useTheme()

  const renderBook = ({ item }) => <Button mode="text" icon="ios-book" color={dark ? 'white' : colors.primary} onPress={() => handlePress(item.book_number)} contentStyle={{ justifyContent: 'flex-start' }}>{item.long_name}</Button>
  const keyExtractor = item => item.book_number.toString()

  useEffect(() => {
    setBook(null)
    fetchBookList('old')
  }, [])

  const handlePress = b => {
    setBook(b)
    fetchChapterList([b])
  }

  const handleChapter = chapter => {
    setBook(null)
    setaBook(book)
    setChapter(chapter)
    fetchCurrent([book])
    fetchSaveMove([book, chapter])
    fetchVerseList(version, [book, chapter])
    navigation.replace('bible')
  }

  return (
    <Surface style={{ flex: 1, paddingHorizontal: 5, paddingBottom: 20 }}>
      {book === null ? <React.Fragment>
        <Title style={{ textAlign: 'center', marginTop: 10 }}>{i18n.t('chapter')}</Title>
        {loading && <ActivityIndicator animating={true} color={colors.primary} />}
        <FlatList
          data={data}
          renderItem={renderBook}
          keyExtractor={keyExtractor}
          initialNumToRender={20}
          maxToRenderPerBatch={10}
        />
      </React.Fragment> : <ScrollView>
          <Title style={{ textAlign: 'center', marginTop: 10 }}>{i18n.t('verse')}</Title>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', padding: 10 }}>
            {chapters.map(item =>
              <Button mode="outlined" key={item.chapter} color={dark ? 'white' : colors.primary} onPress={() => handleChapter(item.chapter)} style={{ margin: 2 }}>{item.chapter}</Button>
            )}
          </View>
        </ScrollView>}
    </Surface>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setaBook: Actions.setBook,
    setChapter: Actions.setChapter,
    fetchCurrent: Actions.fetchCurrent,
    fetchVerseList: Actions.fetchVerseList,
    fetchSaveMove: Actions.fetchSaveMove,
    fetchBookList: Actions.fetchBookList,
    fetchChapterList: Actions.fetchChapterList,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(OldList)
