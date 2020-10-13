import React, { Component } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Title, Caption, Surface } from 'react-native-paper'
import * as FileSystem from 'expo-file-system'
import ProgressCircle from 'react-native-progress-circle'

import { Main } from './navigation'
import * as Actions from './redux/actions'
import { createSql } from './database'
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
    const { exists, initials, setBook, setChapter } = this.props
    // await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite/bible.db`, { idempotent: true })
    this.setState({ msg: 'CARGA INICIAL' })
    if(exists){
      if(initials && initials.id){
        setBook(initials.book_number)
        setChapter(initials.chapter)
      }
      this.setState({ loaded: true })
    } else {
      this.setState({ loading: true, msg: 'DESCARGANDO DATOS' })
      const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite
        const p = Math.round(progress * 100)
        this.setState({ progress: p })
      }
      
      const downloadResumable = FileSystem.createDownloadResumable(
        'https://www.dropbox.com/s/m7sjkidsdwunq99/db.db?dl=1',
        `${FileSystem.documentDirectory}SQLite/bilbe.db`,
        {},
        callback
      )
      await downloadResumable.downloadAsync()
      await createSql('create table if not exists config (id integer primary key not null, book_number smallint, chapter smallint, version varchar(10), fontsize tinyint, theme varchar(12));')
      await createSql('create table if not exists marks (id integer primary key not null, book_number smallint, chapter smallint, verse smallint, color varchar(10));')
      this.setState({ loaded: true, msg: 'INICIANDO' })
    }
  }

  render() {
    const { loading, loaded, progress, msg } = this.state

    if (loaded) return <Main />

    return (
      <Surface style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#1c7ce0'}}>
        {loading && <ProgressCircle
          percent={progress}
          radius={80}
          borderWidth={8}
          color="#d9b310"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Title>{`${progress}%`}</Title>
        </ProgressCircle>}
        <Title style={{ color: 'white' }}>{msg}</Title>
        <Caption style={{ color: 'white', textAlign: 'center' }}>Se necesita conexión a internet y solo ocurrirá la primera vez que inicie la aplicación.</Caption>
      </Surface>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setBook: Actions.setBook,
    setChapter: Actions.setChapter,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Index)
