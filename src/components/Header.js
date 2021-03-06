import React, { useState } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { Appbar, Avatar } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import * as Speech from 'expo-speech'
import i18n from 'i18n-js'

import * as Actions from '../redux/actions'

const regex = /\[(?:.|\n)*?\]/gm
const regex2 = /<(?:.|\n)*?>/gm

function Header({ scene, previous, navigation, setVersion, fetchVerseList }) {
  const { bookname } = useSelector(state => state.current)
  const { avatar, book, chapter, version } = useSelector(state => state.app)
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

  const _alter = () => {
    console.log(version)
    const nversion = version === 'verses' ? 'averses' : 'verses'
    setVersion(nversion)
    fetchVerseList(nversion, [book, chapter])
  }

  const _stop = () => {
    Speech.stop()
  }

  const _play = () => {
    setInProgress(true)
    data.forEach(item => _speak(item.text.replace(regex, '').replace(regex2, '')))
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
      subtitle = `${i18n.t('chapter')} ${chapter}`
    } else {
      subtitle = null
    }
    return subtitle
  }

  return (
    <React.Fragment>
      <StatusBar style="light" />
        <Appbar.Header style={{height: 76}}>
        {['bible', 'search', 'old', 'new', 'bookmarks', 'config'].includes(name) && previous &&
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        }
        <Avatar.Image
          size={40}
          source={avatar ? {uri:avatar} : require('../../assets/avatar.png')}
          style={{marginLeft: previous ? 0 : 14}}
        />
        <Appbar.Content title={getTitle()} subtitle={getSubtitle()} />
        {name === 'bible' && <Appbar.Action icon="random" onPress={_alter} />}
        {inProgress && name === 'bible' && <Appbar.Action icon="stop-circle" onPress={_stop} />}
        {!inProgress && name === 'bible' && <Appbar.Action icon="play-circle" onPress={_play} />}
      </Appbar.Header>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setVersion: Actions.setVersion,
    fetchVerseList: Actions.fetchVerseList,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Header)
