import React, { useEffect, useCallback } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, TouchableOpacity, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { Surface, Text } from 'react-native-paper'
import i18n from 'i18n-js'

import * as Actions from '../redux/actions'

function Bookmarks({ navigation, fetchMarks, setBook, setChapter, fetchCurrent, fetchSaveMove, fetchVerseList }) {
  const { version, fontSize } = useSelector(state => state.app)
  const { data, loading } = useSelector(state => state.mark.list)

  const renderVerse = useCallback(({ item }) => <Item item={item} />, [])
  const keyExtractor = useCallback(item => item.verse.toString(), [])

  const Item = ({ item }) => {
    const text = item.text.length < 73 ? `${item.text}` : `${item.text.substring(0, 70)}...`
  
    return (
      <TouchableOpacity style={{marginTop: 10}} onPress={() => handleNavigate(item)}>
        <Text style={{fontSize: fontSize, textAlign: 'justify', flexShrink: 1}}>{text} <Text style={{fontWeight: 'bold'}}>{item.long_name} {item.chapter}:{item.verse}</Text></Text>
      </TouchableOpacity>
    )
  }

  const ListEmpty = () => {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <Text style={{ textAlign: 'center', fontWeight: 'normal', color: 'gray' }}>
          {i18n.t('empty')}
        </Text>
      </View>
    )
  }

  const handleNavigate = item => {
    setBook(item.book_number)
    setChapter(item.chapter)
    fetchCurrent([item.book_number])
    fetchSaveMove([item.book_number, item.chapter])
    fetchVerseList(version, [item.book_number, item.chapter])
    navigation.replace('bible')
  }

  useEffect(() => {
    fetchMarks()
  }, [])

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

  return (
    <Surface style={styles.container}>
      <SafeAreaView style={styles.list}>
        <FlatList
          data={data}
          renderItem={renderVerse}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          style={{ marginHorizontal: 15, marginVertical: 5 }}
          ListEmptyComponent={ListEmpty}
        />
      </SafeAreaView>
    </Surface>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchMarks: Actions.fetchMarks,
    setBook: Actions.setBook,
    setChapter: Actions.setChapter,
    fetchCurrent: Actions.fetchCurrent,
    fetchSaveMove: Actions.fetchSaveMove,
    fetchVerseList: Actions.fetchVerseList,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Bookmarks)

