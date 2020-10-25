import React, { useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import { Surface, Title, Subheading } from 'react-native-paper'
import i18n from 'i18n-js'

import * as Actions from '../redux/actions'

function Start({ navigation, fetchCurrent }) {
  const { book } = useSelector(state => state.app)
  const { bookname } = useSelector(state => state.current)
  const { chapter } = useSelector(state => state.app)

  useEffect(() => {
    fetchCurrent([book])
  }, [])

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    row: {
      flex: 1,
      flexDirection: 'row'
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    item: {
      flex: 1,
    },
    inside: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF00'
    },
    title: {
      color: '#FFF',
      textAlign: 'center',
      fontSize: 32,
      textShadowColor: '#000',
      textShadowOffset: { width: 0.8, height: 0.8 },
      textShadowRadius: 4,
    },
    quote: {
      position: 'absolute',
      top: 10,
      right: 10,
      color: '#FFF',
      fontSize: 16,
      textShadowColor: '#000',
      textShadowOffset: { width: 0.8, height: 0.8 },
      textShadowRadius: 4,
    }
  })

  return (
    <Surface style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('bible')}>
          <ImageBackground source={require('../../assets/one.jpg')} style={styles.image}>
            <View style={styles.inside}>
              <Subheading style={styles.quote}>{bookname}:{chapter}</Subheading>
              <Title style={styles.title}>{i18n.t('resume')}</Title>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('search')}>
          <ImageBackground source={require('../../assets/two.jpg')} style={styles.image}>
            <View style={styles.inside}>
              <Title style={styles.title}>{i18n.t('search')}</Title>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('old')}>
          <ImageBackground source={require('../../assets/tree.jpg')} style={styles.image}>
            <View style={styles.inside}>
              <Title style={styles.title}>{i18n.t('old')}</Title>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('new')}>
          <ImageBackground source={require('../../assets/four.jpg')} style={styles.image}>
            <View style={styles.inside}>
              <Title style={styles.title}>{i18n.t('new')}</Title>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('bookmarks')}>
          <ImageBackground source={require('../../assets/five.jpg')} style={styles.image}>
            <View style={styles.inside}>
              <Title style={styles.title}>{i18n.t('bookmarks')}</Title>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('config')}>
          <ImageBackground source={require('../../assets/six.jpg')} style={styles.image}>
            <View style={styles.inside}>
              <Title style={styles.title}>{i18n.t('settings')}</Title>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </Surface>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchCurrent: Actions.fetchCurrent,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Start)
