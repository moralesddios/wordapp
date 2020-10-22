import React, { useState, useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Surface, Subheading, Caption, Text, Button, RadioButton } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import * as Yup from 'yup'
import { Formik } from 'formik'

import * as Actions from '../redux/actions'
import { Tracker } from '../components'

const formSchema = Yup.object().shape({
  version: Yup.string()
    .required('Este campo es requerido.'),
  theme: Yup.string()
    .required('Este campo es requerido.'),
  fontsize: Yup.string()
    .required('Este campo es requerido.'),
})

function Config({ navigation, fetchConfig, fetchSaveConfig, setVersion, setTheme, setFontSize, fetchVerseList, fetchCurrent }) {
  const { book, chapter } = useSelector(state => state.app)
  const { loading } = useSelector(state => state.config.save)
  const [initial, setInitial] = useState({
    version: 'verses',
    theme: 'automatic',
    fontsize: 16
  })

  useEffect(() => {
    fetchConfig(setInitial)
  }, [])

  const saved = values => {
    const { version, theme, fontsize } = values
    setVersion(version)
    setTheme(theme)
    setFontSize(fontsize)
    fetchCurrent([book])
    fetchVerseList(version, [book, chapter])
    navigation.goBack()
  }

  const handleChangeFontSize = (setFieldValue, value) => {
    setFieldValue('fontsize', value)
  }

  const submit = values => {
    fetchSaveConfig([values.version, values.theme, values.fontsize], saved)
  }

  return (
    <Surface style={styles.container}>
      <Formik
        initialValues={initial}
        enableReinitialize={true}
        validationSchema={formSchema}
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
            <Subheading>Tema</Subheading>
            <RadioButton.Group name="theme" onValueChange={handleChange('theme')} value={values.theme}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="light" />
                <LinearGradient colors={['#0B3C5D', '#328CC1']} style={{ width: 20, height: 20, borderRadius: 10, marginRight: 6 }} />
                <Text>Claro</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="purple" />
                <LinearGradient colors={['#6a1b9a', '#ec407a']} style={{ width: 20, height: 20, borderRadius: 10, marginRight: 6 }} />
                <Text>Purpura</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="dark" />
                <LinearGradient colors={['#328CC1', '#000']} style={{ width: 20, height: 20, borderRadius: 10, marginRight: 6 }} />
                <Text>Obscuro</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="automatic" />
                <LinearGradient colors={['#CCC', '#000']} style={{ width: 20, height: 20, borderRadius: 10, marginRight: 6 }} />
                <Text>Automático</Text>
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
    setTheme: Actions.setTheme,
    fetchVerseList: Actions.fetchVerseList,
    fetchCurrent: Actions.fetchCurrent,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Config)