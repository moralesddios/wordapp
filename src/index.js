import React, { Component } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import * as FileSystem from 'expo-file-system'
import ProgressCircle from 'react-native-progress-circle'
import i18n from 'i18n-js'

import * as Actions from './redux/actions'
import { createSql } from './database'
import Paper from './paper'
class Index extends Component {
  constructor() {
    super()
    this.state = {
      loaded: false,
      loading: false,
      progress: 0,
      msg: null,
    }
  }

  async componentDidMount() {
    const { exists, initials, setBook, setChapter, setTheme } = this.props
    // await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite/bible.db`, { idempotent: true })
    this.setState({ msg: 'CARGA INICIAL' })
    if(exists){
      if(initials && initials.id){
        setBook(initials.book_number)
        setChapter(initials.chapter)
        setTheme(initials.theme)
      }
      this.setState({ loaded: true })
    } else {
      this.setState({ loading: true, msg: i18n.t('title') })
      const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite
        const p = Math.round(progress * 100)
        this.setState({ progress: p })
      }

      let url = ['en', 'en-US'].includes(i18n.locale) ? 'https://www.dropbox.com/s/03x1taqovvvbj56/bible.db?dl=1' : 'https://www.dropbox.com/s/m7sjkidsdwunq99/db.db?dl=1'
      
      const downloadResumable = FileSystem.createDownloadResumable(
        url, `${FileSystem.documentDirectory}SQLite/bilbe.db`, {}, callback
      )
      await downloadResumable.downloadAsync()
      await createSql('create table if not exists config (id integer primary key not null, book_number smallint, chapter smallint, version varchar(10), fontsize tinyint, theme varchar(12));')
      await createSql('create table if not exists marks (id integer primary key not null, book_number smallint, chapter smallint, verse smallint, color varchar(10));')
      this.setState({ loaded: true, msg: 'INICIANDO' })
    }
  }

  render() {
    const { loading, loaded, progress, msg } = this.state

    if (loaded) return <Paper />

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#1c7ce0'}}>
        {loading && <ProgressCircle
          percent={progress}
          radius={80}
          borderWidth={8}
          color="#d9b310"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text style={{color: '#616161', fontSize: 24}}>{`${progress}%`}</Text>
        </ProgressCircle>}
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>{msg}</Text>
        {loading && <Text style={{ color: 'white', textAlign: 'center', marginTop: 5 }}>{i18n.t('message')}</Text>}
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setBook: Actions.setBook,
    setChapter: Actions.setChapter,
    setTheme: Actions.setTheme,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Index)
