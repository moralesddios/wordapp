import React, { useState, useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { Surface, Title, Button, useTheme } from 'react-native-paper'
import { UIActivityIndicator } from 'react-native-indicators'
import i18n from 'i18n-js'

import * as Actions from '../redux/actions'

function OldList({ navigation, setaBook, setChapter, fetchCurrent, fetchSaveMove, fetchVerseList, fetchBookList, fetchChapterList }) {
  const { data, loading } = useSelector(state => state.book)
  const { chapters } = useSelector(state => state.chapter)
  const { version } = useSelector(state => state.app)
  const [book, setBook] = useState(null)
  const { colors, dark } = useTheme()

  const renderBook = ({ item }) => <Button mode="outlined" color={dark ? 'white' : colors.primary} onPress={() => handlePress(item.book_number)} style={{flex: 1, margin: 2}} contentStyle={{ justifyContent: 'flex-start' }}>{item.long_name}</Button>
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
    <Surface style={{ flex: 1, paddingTop: 10, paddingHorizontal: 5, paddingBottom: 20 }}>
      <SafeAreaView style={{flex: 1}}>
        {book === null ? <React.Fragment>
          {loading ? <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}><UIActivityIndicator color={colors.primary} /></View> :
          <FlatList
            data={data}
            renderItem={renderBook}
            keyExtractor={keyExtractor}
            initialNumToRender={20}
            maxToRenderPerBatch={10}
            numColumns={2}
            columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
          />}
        </React.Fragment> : <ScrollView>
            <Title style={{ textAlign: 'center', marginTop: 10 }}>{i18n.t('verse')}</Title>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', padding: 10 }}>
              {chapters.map(item =>
                <Button mode="outlined" key={item.chapter} color={dark ? 'white' : colors.primary} onPress={() => handleChapter(item.chapter)} style={{ margin: 2 }}>{item.chapter}</Button>
              )}
            </View>
          </ScrollView>}
      </SafeAreaView>
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
