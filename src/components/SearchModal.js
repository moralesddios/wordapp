import React, { useState, useEffect, useCallback } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, ScrollView, FlatList, Dimensions } from 'react-native'
import { Title, Button, useTheme } from 'react-native-paper'
import { Overlay } from 'react-native-elements'

import * as Actions from '../redux/actions'

function SearchModal({ fetchBookList, fetchChapterList, toggleSearchModal, handleNavigate }) {
  const { data } = useSelector(state => state.book)
  const { chapters } = useSelector(state => state.chapter)
  const { modal } = useSelector(state => state.app)
  const [book, setBook] = useState(null)
  const { colors } = useTheme()

  const renderBook = useCallback(({ item }) => <Button mode="text" icon="ios-book" color={colors.text} onPress={() => handlePress(item.book_number)} style={{marginTop: 10}} contentStyle={{display: 'flex', justifyContent: 'flex-start'}}>{item.long_name}</Button>, [])
  const keyExtractor = useCallback(item => item.book_number.toString(), [])

  useEffect(() => {
    fetchBookList()
  }, [])

  const handlePress = b => {
    setBook(b)
    fetchChapterList([b])
  }

  const handleChapter = chapter => {
    handleNavigate(book, chapter)
    setBook(null)
  }

  return (
    <Overlay isVisible={modal} onBackdropPress={toggleSearchModal} overlayStyle={{backgroundColor: colors.surface, width: Dimensions.get('window').width - 20, height: Dimensions.get('window').height - 250}}>
      {book === null ? <FlatList
          data={data}
          renderItem={renderBook}
          keyExtractor={keyExtractor}
          initialNumToRender={20}
          maxToRenderPerBatch={10}
        /> : <ScrollView>
          {/* <Title style={{ textAlign: 'center', marginTop: 10 }}>{books[book]._bname}</Title> */}
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', padding: 20 }}>
            {chapters.map(item =>
              <Button mode="contained" key={item.chapter} onPress={() => handleChapter(item.chapter)} style={{margin: 5}}>{item.chapter}</Button>
            )}
          </View>
        </ScrollView>}
    </Overlay>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchBookList: Actions.fetchBookList,
    fetchChapterList: Actions.fetchChapterList,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(SearchModal)
