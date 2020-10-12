import React, { useState } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { Appbar } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import * as Speech from 'expo-speech'

import * as Actions from '../redux/actions'

const regex = /<(?:.|\n)*?>/gm

function Header({ scene, previous, navigation, setModalVisible }) {
  const { bookname } = useSelector(state => state.current)
  const { chapter, modal } = useSelector(state => state.app)
  const { data } = useSelector(state => state.verse)
  const [inProgress, setInProgress] = useState(false)

  const { name } = scene.route

  const _speak = text => {
    const start = () => {
      setInProgress(true)
    }

    const complete = () => {
      setInProgress(false)
    }

    Speech.speak(text, {
      onStart: start,
      onDone: complete,
      onStopped: complete,
      onError: complete,
    })
  }

  const _stop = () => {
    Speech.stop()
  }

  const _play = () => {
    setInProgress(true)
    data.forEach(item => _speak(item.text.replace(regex, '')))
  }

  const getTitle = () => {
    let title = ''
    if (['bible'].includes(name)) {
      title = bookname
    } else {
      title = scene.descriptor && scene.descriptor.options && scene.descriptor.options.title
    }
    return title
  }

  const getSubtitle = () => {
    let subtitle = ''
    if (['bible'].includes(name)) {
      subtitle = `Capítulo ${chapter}`
    } else {
      subtitle = null
    }
    return subtitle
  }

  return (
    <React.Fragment>
      <StatusBar style="light" />
        <Appbar.Header style={{height: 76}}>
        {previous ?
          <Appbar.BackAction onPress={() => navigation.goBack()} /> :
          <Appbar.Action icon="ios-settings" onPress={() => navigation.navigate('config')} />
        }
        <Appbar.Content title={getTitle()} subtitle={getSubtitle()}  />
        {inProgress && name === 'bible' && <Appbar.Action icon="ios-square" onPress={() => _stop()} />}
        {!inProgress && name === 'bible' && <Appbar.Action icon="ios-play" onPress={() => _play()} />}
        {name === 'bible' && <Appbar.Action icon="ios-search" onPress={() => setModalVisible(!modal)} />}
      </Appbar.Header>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setModalVisible: Actions.setModalVisible,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Header)
