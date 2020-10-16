import React, { useState, useEffect, useCallback } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, ScrollView, FlatList, Dimensions } from 'react-native'
import { Title, Button, useTheme } from 'react-native-paper'
import { Overlay, SearchBar } from 'react-native-elements'

import * as Actions from '../redux/actions'

function SearchModal({ fetchBookList, fetchChapterList, toggleSearchModal, handleNavigate }) {
  const { data } = useSelector(state => state.book)
  const { chapters } = useSelector(state => state.chapter)
  const { modal } = useSelector(state => state.app)
  const [book, setBook] = useState(null)
  const [search, setSearch] = useState('')
  const { colors, dark } = useTheme()

  const renderBook = ({ item }) => <Button mode="text" icon="ios-book" color={dark ? 'white' : colors.primary} onPress={() => handlePress(item.book_number)} contentStyle={{justifyContent: 'flex-start'}}>{item.long_name}</Button>
  const keyExtractor = item => item.book_number.toString()

  useEffect(() => {
    setBook(null)
    fetchBookList('')
  }, [])

  const handlePress = b => {
    setBook(b)
    fetchChapterList([b])
  }

  const handleSearch = value => {
    setSearch(value)
    if(value && value.length > 2 ){
      fetchBookList(value)
    }
  }

  const handleChapter = chapter => {
    handleNavigate(book, chapter)
    setBook(null)
  }

  return (
    <Overlay isVisible={modal} onBackdropPress={toggleSearchModal} overlayStyle={{backgroundColor: colors.surface, width: Dimensions.get('window').width - 20, height: Dimensions.get('window').height - 250}}>
      {book === null ? <React.Fragment>
          <Title style={{ color: colors.primary, textAlign: 'center', marginTop: 10 }}>Capítulo</Title>
          <SearchBar
            platform="ios"
            cancelButtonTitle="Cerrar"
            containerStyle={{ backgroundColor: colors.surface }}
            placeholder="Buscar..."
            onChangeText={handleSearch}
            value={search}
          />
          <FlatList
            data={data}
            renderItem={renderBook}
            keyExtractor={keyExtractor}
            initialNumToRender={20}
            maxToRenderPerBatch={10}
          />
        </React.Fragment> : <ScrollView>
          <Title style={{ color: colors.primary, textAlign: 'center', marginTop: 10 }}>Versículo</Title>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', padding: 20 }}>
            {chapters.map(item =>
              <Button mode="outlined" key={item.chapter} color={dark ? 'white' : colors.primary} onPress={() => handleChapter(item.chapter)} style={{margin: 5}}>{item.chapter}</Button>
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
