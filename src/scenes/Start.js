import React, { useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { Surface, Text, Caption, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'
import i18n from 'i18n-js'

import * as Actions from '../redux/actions'

function Start({ navigation, fetchCurrent }) {
  const { book } = useSelector(state => state.app)
  const { bookname } = useSelector(state => state.current)
  const { chapter } = useSelector(state => state.app)

  const { dark, colors } = useTheme()

  useEffect(() => {
    fetchCurrent([book])
  }, [])

  const color_icon = dark ? '#ccc' : colors.primary 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 10
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
      margin: 10,
      borderWidth: 0.2,
      borderColor: '#888',
      borderStyle: 'solid',
      borderRadius: 10,
    },
    inside: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10
    },
    title: {
      marginTop: 6,
      textAlign: 'center',
      color: '#888',
      fontSize: 18
    },
    quote: {
      position: 'absolute',
      color: '#888',
      top: 10,
      right: 10,
      fontSize: 16
    },
    version: {
      textAlign: 'center'
    }
  })

  return (
    <Surface style={styles.container}>
      <View style={styles.row}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('bible')}>
          <View style={styles.item}>
            <View style={styles.inside}>
              <Icon name="bible" size={90} color={color_icon} />
              <Text style={styles.quote}>{bookname}: {chapter}</Text>
              <Text style={styles.title}>{i18n.t('resume').replace(' ', '\n')}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => navigation.navigate('search')}>
          <View style={styles.item}>
            <View style={styles.inside}>
              <Icon name="search" size={90} color={color_icon} />
              <Text style={styles.title}>{i18n.t('search').replace(' ', '\n')}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.row}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('old')}>
          <View style={styles.item}>
            <View style={styles.inside}>
              <Icon name="mountain" size={90} color={color_icon} />
              <Text style={styles.title}>{i18n.t('old').replace(' ', '\n')}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => navigation.navigate('new')}>
          <View style={styles.item}>
            <View style={styles.inside}>
              <Icon name="cross" size={90} color={color_icon} />
              <Text style={styles.title}>{i18n.t('new').replace(' ', '\n')}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.row}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('bookmarks')}>
          <View style={styles.item}>
            <View style={styles.inside}>
              <Icon name="bookmark" size={90} color={color_icon} />
              <Text style={styles.title}>{i18n.t('bookmarks').replace(' ', '\n')}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => navigation.navigate('config')}>
          <View style={styles.item}>
            <View style={styles.inside}>
              <Icon name="cog" size={90} color={color_icon} />
              <Text style={styles.title}>{i18n.t('settings').replace(' ', '\n')}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
      <Caption style={styles.version}>{i18n.t('version')} 1.0.0</Caption>
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
