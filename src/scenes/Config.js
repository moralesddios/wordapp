import React, { useState, useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, AsyncStorage, StyleSheet } from 'react-native'
import { Surface, Subheading, Text, Button, RadioButton } from 'react-native-paper'

import * as Actions from '../redux/actions'

function Config({ navigation, fetchBookList, fetchVerseList, fetchCurrent }) {
  const { book, chapter } = useSelector(state => state.app)
  const [value, setValue] = useState('verses')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchValue()
  }, [])

  fetchValue = async() => {
    let tname = await AsyncStorage.getItem('TABLENAME')
    if(tname === null) tname = 'verses'
    setValue(tname)
  }

  const save = async () => {
    setLoading(true)
    await AsyncStorage.setItem('TABLENAME', value)
    fetchBookList()
    fetchCurrent([book])
    fetchVerseList([book, chapter])
    setLoading(false)
    navigation.goBack()
  }

  return (
    <Surface style={styles.container}>
      <Subheading>Versión</Subheading>
      <RadioButton.Group onValueChange={setValue} value={value}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="verses" />
          <Text>Reina Valera</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="averses" />
          <Text>Traducción al lenguaje actual</Text>
        </View>
      </RadioButton.Group>
      <Button icon="ios-save" mode="contained" loading={loading} disabled={loading} onPress={() => save()} style={{ marginTop: 10 }}>
        Guardar
      </Button>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  }
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchBookList: Actions.fetchBookList,
    fetchVerseList: Actions.fetchVerseList,
    fetchCurrent: Actions.fetchCurrent,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Config)