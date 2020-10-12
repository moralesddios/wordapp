import React, { useState, useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Surface, Subheading, Text, Button, RadioButton } from 'react-native-paper'
import * as Yup from 'yup'
import { Formik } from 'formik'

import * as Actions from '../redux/actions'
import { Tracker } from '../components'

const formSchema = Yup.object().shape({
  id: Yup.number()
    .nullable(),
  version: Yup.string()
    .required('Este campo es requerido.'),
  fontsize: Yup.string()
    .required('Este campo es requerido.'),
})

function Config({ navigation, fetchConfig, fetchSaveConfig, setVersion, setFontSize, fetchBookList, fetchVerseList, fetchCurrent }) {
  const { book, chapter } = useSelector(state => state.app)
  const { loading } = useSelector(state => state.config.save)
  const [initial, setInitial] = useState({
    id: null,
    version: '',
    fontsize: 16,
  })

  useEffect(() => {
    fetchConfig(setInitial)
  }, [])

  const saved = values => {
    const { version, fontsize } = values
    setVersion(version)
    setFontSize(fontsize)
    fetchBookList()
    fetchCurrent([book])
    fetchVerseList(version, [book, chapter])
    navigation.goBack()
  }

  const handleChangeFontSize = (setFieldValue, value) => {
    setFieldValue('fontsize', value)
  }

  const submit = values => {
    fetchSaveConfig(values, saved)
  }
  
  const reset = () => {
    console.log('Reset!!!')
  } 

  return (
    <Surface style={styles.container}>
      <Formik
        initialValues={initial}
        enableReinitialize={true}
        validationSchema={formSchema}
        onReset={reset}
        onSubmit={submit}>
        {({ handleChange, handleSubmit, setFieldValue, errors, touched, values }) => (
          <React.Fragment>
            <Subheading>Versión</Subheading>
            <RadioButton.Group name="version" onValueChange={handleChange('version')} value={values.version}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="verses" />
                <Text>Reina Valera</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="averses" />
                <Text>Traducción al lenguaje actual</Text>
              </View>
            </RadioButton.Group>
            <Subheading>Tamaño del texto</Subheading>
            <Tracker
              name="fontsize"
              onValueChange={value => handleChangeFontSize(setFieldValue, value)}
              value={values.fontsize}
            />
            <View style={{alignItems: 'flex-end'}}>
              <Button icon="ios-save" mode="contained" loading={loading} disabled={loading} onPress={handleSubmit} style={{ marginTop: 10 }}>
                Guardar
              </Button>
            </View>
          </React.Fragment>
        )}
      </Formik>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchConfig: Actions.fetchConfig,
    fetchSaveConfig: Actions.fetchSaveConfig,
    setVersion: Actions.setVersion,
    setFontSize: Actions.setFontSize,
    fetchBookList: Actions.fetchBookList,
    fetchVerseList: Actions.fetchVerseList,
    fetchCurrent: Actions.fetchCurrent,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Config)