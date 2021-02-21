import React, { useState, useEffect } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { View, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { Surface, Subheading, Text, Button, RadioButton, useTheme } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import * as Yup from 'yup'
import { Formik } from 'formik'
import i18n from 'i18n-js'

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

function Config({ navigation, fetchConfig, fetchSaveConfig, setVersion, setTheme, setFontSize, setAvatarUrl, fetchVerseList, fetchCurrent }) {
  const { avatar, book, chapter } = useSelector(state => state.app)
  const { loading } = useSelector(state => state.config.save)
  const { colors } = useTheme()
  const [avatarURL, setAvatarURL] = useState(avatar)
  const [dirty, setDirty] = useState(false)
  const [initial, setInitial] = useState({
    version: 'verses',
    theme: 'automatic',
    fontsize: 16
  })

  useEffect(() => {
    fetchConfig(setInitial)
  }, [])

  const saved = values => {
    const { avatar, version, theme, fontsize } = values
    setAvatarUrl(avatar)
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

  const submit = async values => {
    if (dirty){
      let photoURL = null
      if(avatarURL){
        const uid = Date.now().toString(36) + Math.random().toString(36).substring(2)
        photoURL = `${FileSystem.documentDirectory}wordapp/${uid}`
        await FileSystem.copyAsync({from: avatarURL, to: photoURL})
      }
      fetchSaveConfig([photoURL, values.version, values.theme, values.fontsize], saved)
    } else {
      fetchSaveConfig([avatarURL, values.version, values.theme, values.fontsize], saved)
    }
  }

  const chooseImage = async() => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        "Error",
        "Sorry, we need camera roll permissions to make this work!",
      )
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      })

      if(!result.cancelled){
        setDirty(true)
        setAvatarURL(result.uri)
      }
    }
  }

  const dropImage = () => {
    Alert.alert(
      'Foto de perfil',
      `¿Seguro de eliminar su foto de perfil?`,
      [{
          text: 'Cancelar'
      },{
          text: 'Aceptar',
          onPress: () => {
            setDirty(true)
            setAvatarURL(null)
          }
      }]
    )
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
            <Subheading>{i18n.t('photo')}</Subheading>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={chooseImage}>
                <Image
                  source={avatarURL ? {uri:avatarURL} : require('../../assets/avatar.png')}
                  style={{height: 80, width: 80, backgroundColor: colors.primary, borderRadius: 40}}
                />
              </TouchableOpacity>
              <View style={{ marginLeft: 10, alignSelf: 'flex-start' }}>
                <Button mode="text" onPress={dropImage} disabled={!avatarURL}>{i18n.t('remove')}</Button>
              </View>
            </View>
            <Subheading>{i18n.t('version')}</Subheading>
            <RadioButton.Group name="version" onValueChange={handleChange('version')} value={values.version}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="verses" />
                <Text>{i18n.t('primary')}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="averses" />
                <Text>{i18n.t('secondary')}</Text>
              </View>
            </RadioButton.Group>
            <Subheading>{i18n.t('theme')}</Subheading>
            <RadioButton.Group name="theme" onValueChange={handleChange('theme')} value={values.theme}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="light" />
                <LinearGradient colors={['#0B3C5D', '#328CC1']} style={{ width: 20, height: 20, borderRadius: 10, marginRight: 6 }} />
                <Text>{i18n.t('light')}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="purple" />
                <LinearGradient colors={['#6a1b9a', '#ec407a']} style={{ width: 20, height: 20, borderRadius: 10, marginRight: 6 }} />
                <Text>{i18n.t('purple')}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="dark" />
                <LinearGradient colors={['#328CC1', '#000']} style={{ width: 20, height: 20, borderRadius: 10, marginRight: 6 }} />
                <Text>{i18n.t('dark')}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="automatic" />
                <LinearGradient colors={['#CCC', '#000']} style={{ width: 20, height: 20, borderRadius: 10, marginRight: 6 }} />
                <Text>{i18n.t('automatic')}</Text>
              </View>
            </RadioButton.Group>
            <Subheading>{i18n.t('fontsize')}</Subheading>
            <Tracker
              name="fontsize"
              onValueChange={value => handleChangeFontSize(setFieldValue, value)}
              value={values.fontsize}
            />
            <View style={{alignItems: 'flex-end'}}>
              <Button icon="save" mode="contained" loading={loading} disabled={loading} onPress={handleSubmit} style={{ marginTop: 10 }}>
                {i18n.t('save')}
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
    setAvatarUrl: Actions.setAvatarUrl,
    fetchVerseList: Actions.fetchVerseList,
    fetchCurrent: Actions.fetchCurrent,
  }, dispatch);
}

export default compose(
  connect(null, mapDispatchToProps),
)(Config)